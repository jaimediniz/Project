import { CalendarEvent, CalendarView } from "angular-calendar";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { LoggerService } from "src/app/services/logger.service";

interface Film {
  id: number;
  title: string;
  release_date: string;
}

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, "0");
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, "0");
  const direction = timezoneOffset > 0 ? "-" : "+";

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  calendarView = CalendarView;

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent<{ film: Film }>[]>;

  activeDayIsOpen: boolean = false;

  constructor(private http: HttpClient, private logger: LoggerService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  async test(multiplier) {
    let newDate: Date;
    if (this.view === "month") {
      newDate = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth() + 1 * multiplier,
        this.viewDate.getDate()
      );
    } else if (this.view === "week") {
      newDate = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth(),
        this.viewDate.getDate() + 7 * multiplier
      );
    } else {
      newDate = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth(),
        this.viewDate.getDate() + 1 * multiplier
      );
    }
    console.log(newDate.getMonth(), this.viewDate.getMonth());
    if (newDate.getMonth() !== this.viewDate.getMonth()) {
      this.viewDate = newDate;
      this.fetchEvents();
      return;
    }
    this.viewDate = newDate;
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    const params = new HttpParams()
      .set(
        "primary_release_date.gte",
        format(getStart(this.viewDate), "yyyy-MM-dd")
      )
      .set(
        "primary_release_date.lte",
        format(getEnd(this.viewDate), "yyyy-MM-dd")
      )
      .set("api_key", "0ec33936a68018857d727958dca1424f");

    this.events$ = this.http
      .get("https://api.themoviedb.org/3/discover/movie", { params })
      .pipe(
        map(({ results }: { results: Film[] }) => {
          return results.map((film: Film) => {
            return {
              title: film.title,
              start: new Date(
                film.release_date + getTimezoneOffsetString(this.viewDate)
              ),
              color: {
                primary: "#e3bc08",
                secondary: "#FDF1BA",
              },
              allDay: true,
              meta: {
                film,
              },
            };
          });
        })
      );
  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ film: Film }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ film: Film }>): void {
    window.open(
      `https://www.themoviedb.org/movie/${event.meta.film.id}`,
      "_blank"
    );
  }
}

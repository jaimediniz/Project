import { Subject } from "rxjs";

import { Injectable } from "@angular/core";
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";

import { LoggerService } from "./logger.service";

@Injectable({
  providedIn: "root",
})
export class RouteExtensionService {
  lastRoute: string;
  paramsSubject = new Subject<string>();

  constructor(private logger: LoggerService, private route: Router) {
    this.route.onSameUrlNavigation = "reload";
    this.route.events.subscribe(async (event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator

        if (this.lastRoute === event.url) {
          if (event.url !== "/home") {
            this.route.navigate(["/home"]);
          }
          return;
        }
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator

        this.logger.emitLog({
          className: "RouteExtensionService",
          functionName: "constructor",
          description: "Emit new string",
          variable: "urlAfterRedirects",
          value: event.urlAfterRedirects,
          subscribers: this.paramsSubject.observers,
        });
        this.lastRoute = event.urlAfterRedirects;
        this.paramsSubject.next(event.urlAfterRedirects);
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        this.logger.errorLog({
          className: "RouteExtensionService",
          functionName: "constructor",
          description: "Navigation Error!",
          variable: "Error",
          value: event.error,
        });
      }
    });
  }
}

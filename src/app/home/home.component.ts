import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { userService } from "../services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  users: Array<{ id: number; name: string }>;
  opened = true;

  constructor(private userService: userService) {
    this.userService.usersSub.asObservable().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnInit(): void {}

  selectTarget(userID): void {
    this.userService.emitSelected(this.users[userID]);
  }
}

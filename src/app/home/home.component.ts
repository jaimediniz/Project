import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { userService } from "../services/user.service";
import { LoggerService } from "../services/logger.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  users: Array<{ id: number; name: string }>;
  opened = true;

  constructor(private userService: userService, private logger: LoggerService) {
    this.userService.usersSub.asObservable().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnInit(): void {}

  selectTarget(userID): void {
    this.userService.emitSelected(this.users[userID]);
  }

  handleOpening(selectTab) {
    this.logger.infoLog({
      component: "Home",
      codePart: "handleOpening",
      variable: `Select Tab: ${selectTab}`,
    });
    this.opened = true;
  }
}

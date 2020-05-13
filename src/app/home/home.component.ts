import { Subscription } from "rxjs";

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";

import { LoggerService } from "../services/logger.service";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  webPackage = "./src/app/home/home.component.ts";

  usersSubscription: any; // Subscription
  users: Array<{ id: number; name: string }>;
  opened = true;

  constructor(private userService: UserService, private logger: LoggerService) {
    this.users = this.userService.users;
    this.usersSubscription = this.userService.usersSub
      .asObservable()
      .subscribe((users) => {
        this.users = users;
      });
    this.usersSubscription.subscriberName = "HomeComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "HomeComponent",
      functionName: "constructor",
      values: ["Subscribed to users list"],
    });
  }

  ngOnInit(): void {}

  selectTarget(userID): void {
    this.userService.emitSelected(this.users[userID]);
  }

  handleOpening(selectTab) {
    this.logger.infoLog({
      className: "HomeComponent",
      functionName: "handleOpening",
      description: "Open drawer in selectTab",
      variable: "selectTab",
      value: selectTab,
    });
    this.opened = true;
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "HomeComponent",
      functionName: "ngOnDestroy",
      values: ["Unsubscribed to users list"],
    });
  }
}

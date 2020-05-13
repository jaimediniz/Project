import { Subscription } from "rxjs";

import { Component, OnDestroy, OnInit } from "@angular/core";

import { LoggerService } from "../services/logger.service";
import { UserService } from "../services/user.service";

export const rootVariables: Object = {
  "--main-bg-color": "white",
  "--main-txt-color": "rgb(0, 0, 0)",
  "--main-header-color": "rgb(92, 187, 128)",
  "--main-body-color": "white",
  "--main-color-faded": "rgba(0, 0, 0, 0.12)",
  "--main-drawer-width": "300px",
  "--main-drawer-width-closed": "50px",
  "--main-header-height": "50px",
  "--main-padding": "16px",
  "--main-txt-font": '400 14px/20px Roboto, "Helvetica Neue", sans-serif',
};
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
    for (const key in rootVariables) {
      document.documentElement.style.setProperty(key, rootVariables[key]);
    }

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

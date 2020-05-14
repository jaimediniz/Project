import { Subscription } from "rxjs";

import { Component, OnDestroy, OnInit } from "@angular/core";

import { LoggerService } from "../services/logger.service";
import { UserService } from "../services/user.service";

export const rootVariables: Array<{ key: string; value: string }> = [
  { key: "--main-bg-color", value: "white" },
  { key: "--main-txt-color", value: "rgb(0, 0, 0)" },
  { key: "--main-header-color", value: "rgb(92, 187, 128)" },
  { key: "--main-body-color", value: "white" },
  { key: "--main-color-faded", value: "rgba(0, 0, 0, 0.12)" },
  { key: "--main-drawer1-width", value: "300px" },
  { key: "--main-drawer1-width-closed", value: "55px" },
  { key: "--main-drawer2-width", value: "600px" },
  { key: "--main-drawer2-width-closed", value: "0px" },
  { key: "--main-header-height", value: "50px" },
  { key: "--main-padding", value: "16px" },
  { key: "--font-size-small", value: "12px" },
  { key: "--font-size-normal", value: "18px" },
  { key: "--font-size-big", value: "20px" },
  { key: "--font-size-large", value: "24px" },
  { key: "--font-size-icons", value: "24px" },
  {
    key: "--main-txt-font",
    value: '400 14px/20px Roboto, "Helvetica Neue", sans-serif',
  },
];
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  webPackage = "./src/app/home/home.component.ts";

  usersSubscription: any; // Subscription
  users: Array<{ id: number; name: string }>;
  drawer1 = true;
  drawer2 = false;

  constructor(private userService: UserService, private logger: LoggerService) {
    for (const property of rootVariables) {
      document.documentElement.style.setProperty(property.key, property.value);
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

  handleOpening(drawer, selectTab) {
    this.logger.infoLog({
      className: "HomeComponent",
      functionName: "handleOpening",
      description: `Open drawer ${drawer} in selectTab`,
      variable: "selectTab",
      value: selectTab,
    });
    this[`drawer${drawer}`] = true;
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

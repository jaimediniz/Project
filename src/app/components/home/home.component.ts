import { Subscription } from "rxjs";

import { Component, OnDestroy, OnInit } from "@angular/core";

import { LoggerService } from "../../services/logger.service";
import { UserService } from "../../services/user.service";
import { RouteExtensionService } from "src/app/services/route-extension.service";

export const rootVariables: Array<{ key: string; value: string }> = [
  { key: "--main-bg-color", value: "white" },
  { key: "--main-txt-color", value: "rgb(0, 0, 0)" },
  { key: "--main-header-color", value: "rgb(92, 187, 128)" },
  { key: "--main-body-color", value: "white" },
  { key: "--main-color-faded", value: "rgba(0, 0, 0, 0.12)" },
  { key: "--main-drawer-width", value: "300px" },
  { key: "--main-drawer-width-closed", value: "55px" },
  { key: "--main-viewer2-width", value: "600px" },
  { key: "--main-viewer2-width-closed", value: "0px" },
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
  webPackage = "./src/app/components/home/home.component.ts";

  usersSubscription: any; // Subscription
  users: Array<{ id: number; name: string }>;
  sidePanel1 = true;
  sidePanel2 = false;
  appRoute: string;

  constructor(
    private userService: UserService,
    private logger: LoggerService,
    private route: RouteExtensionService
  ) {
    for (const property of rootVariables) {
      document.documentElement.style.setProperty(property.key, property.value);
    }

    this.route.routeSubject.asObservable().subscribe((routeSubject) => {
      this.appRoute = routeSubject;
    });

    this.users = this.userService.contacts;
    this.usersSubscription = this.userService.contactsSub
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

  handleOpening(panel, selectTab) {
    this.logger.infoLog({
      className: "HomeComponent",
      functionName: "handleOpening",
      description: `Open drawer ${panel} in selectTab`,
      variable: "selectTab",
      value: selectTab,
    });
    this[`sidePanel${panel}`] = true;
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

import { Subject } from "rxjs";

import { Injectable } from "@angular/core";
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";

import { LoggerService } from "./logger.service";

import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class RouteExtensionService {
  lastRoute: string;
  paramsSubject = new Subject<string>();

  routeSubject = new Subject<string>();

  constructor(
    private logger: LoggerService,
    private route: Router,
    private userService: UserService
  ) {
    this.route.onSameUrlNavigation = "reload";

    this.lastRoute = this.route.url;
    this.route.events.subscribe(async (event) => {
      if (event instanceof NavigationStart) {
        this.navigationStart(event);
      } else if (event instanceof NavigationEnd) {
        this.navigationEnd(event);
      } else if (event instanceof NavigationError) {
        this.navigationError(event);
      }
    });
  }

  navigationStart(event) {
    // Show loading indicator
    if (event.url === "/login" || event.url === "/register") {
      this.routeSubject.next("auth");
      return;
    }
    this.routeSubject.next("app");

    if (this.lastRoute === event.url) {
      if (event.url !== "/home") {
        this.route.navigate(["/home"]);
      }
    }
  }

  navigationEnd(event) {
    // Hide loading indicator

    this.logger.emitLog({
      className: "RouteExtensionService",
      functionName: "navigationEnd",
      description: "Emit new string",
      variable: "urlAfterRedirects",
      value: event.urlAfterRedirects,
      subscribers: this.paramsSubject.observers,
    });
    this.lastRoute = event.urlAfterRedirects;
    this.paramsSubject.next(event.urlAfterRedirects);
    const params = event.urlAfterRedirects.split("/");
    const finalRoute = params[1];
    const valueToEmit = parseInt(params[2]);
    if (finalRoute === "contacts") {
      this.userService.emitSelectedContact(valueToEmit);
    } else if (finalRoute === "groups") {
      this.userService.emitSelectedGroup(valueToEmit);
    } else if (finalRoute === "invites") {
      this.userService.emitSelectedInvite(valueToEmit);
    } else {
      this.userService.emitSelectedUserId(undefined);
    }
    // Emit selectedUser
  }

  navigationError(event) {
    // Hide loading indicator

    this.logger.errorLog({
      className: "RouteExtensionService",
      functionName: "navigationError",
      description: "Navigation Error!",
      variable: "Error",
      value: event.error,
    });
  }
}

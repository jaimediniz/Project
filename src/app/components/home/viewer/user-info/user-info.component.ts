import { Subscription } from "rxjs";
import { LoggerService } from "src/app/services/logger.service";
import { UserService } from "src/app/services/user.service";

import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  webPackage =
    "./src/app/components/home/viewer/user-info/user-info.component.ts";

  user: { id: number; name: string };
  userSub: any; // Subscription

  constructor(private userService: UserService, private logger: LoggerService) {
    this.user = this.userService.selectedContact;
    console.log(this.user);
    this.userSub = this.userService.selectedContactSub
      .asObservable()
      .subscribe((selectedUser) => {
        this.user = selectedUser;
        console.log(selectedUser);
      });
    this.userSub.subscriberName = "UserInfoComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "UserInfoComponent",
      functionName: "constructor",
      values: ["Subscribed to selected user"],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "UserInfoComponent",
      functionName: "ngOnDestroy",
      values: ["Unsubscribed from selected user"],
    });
  }
}

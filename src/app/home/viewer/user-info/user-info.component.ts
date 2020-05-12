import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { LoggerService } from "src/app/services/logger.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  webPackage = "./src/app/home/viewer/user-info/user-info.component.ts";

  user: { id: number; name: string };
  userSub: Subscription;

  constructor(private userService: UserService, private logger: LoggerService) {
    this.user = this.userService.selectedUser;
    this.userSub = this.userService.selectedUserSub
      .asObservable()
      .subscribe((selectedUser) => {
        this.user = selectedUser;
      });
    this.userSub.subscriberName = "UserInfoComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "UserInfoComponent",
      functionName: "constructor",
      values: ["Subscribed to users list"],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "UserInfoComponent",
      functionName: "ngOnDestroy",
      values: ["Unsubscribed from users list"],
    });
  }
}

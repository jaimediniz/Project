import { Component, OnInit, OnDestroy } from "@angular/core";
import { userService } from "src/app/services/user.service";
import { LoggerService } from "src/app/services/logger.service";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  userSub: any;

  constructor(private userService: userService, private logger: LoggerService) {
    this.user = this.userService.selectedUser;
    this.userSub = this.userService.selectedUserSub
      .asObservable()
      .subscribe((selectedUser) => {
        this.user = selectedUser;
      });
    this.logger.infoLog({
      component: "User-info",
      codePart: "constructor",
      variable: "Subscribed!",
      color: "blue",
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.logger.infoLog({
      component: "User-info",
      codePart: "ngOnDestroy",
      variable: "Unsubscribed!",
      color: "red",
    });
  }
}

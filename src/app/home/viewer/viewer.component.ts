import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { userService } from "src/app/services/user.service";
import { LoggerService } from "src/app/services/logger.service";

@Component({
  selector: "app-viewer",
  templateUrl: "./viewer.component.html",
  styleUrls: ["./viewer.component.scss"],
})
export class ViewerComponent implements OnInit, OnDestroy {
  conditionExpression: any = false;
  selectedUserSub: any;

  constructor(private userService: userService, private logger: LoggerService) {
    this.selectedUserSub = this.userService.selectedUserSub
      .asObservable()
      .subscribe((selectedUser) => {
        this.conditionExpression = selectedUser ? "userInfo" : false;
      });
    this.logger.infoLog({
      component: "Viewer",
      codePart: "constructor",
      variable: "Subscribed!",
      color: "blue",
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectedUserSub.unsubscribe();
    this.logger.infoLog({
      component: "Viewer",
      codePart: "ngOnDestroy",
      variable: "Unsubscribed!",
      color: "red",
    });
  }
}

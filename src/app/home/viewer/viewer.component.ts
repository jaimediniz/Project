import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { userService } from "src/app/services/user.service";
import { LoggerService } from "src/app/services/logger.service";

@Component({
  selector: "app-viewer",
  templateUrl: "./viewer.component.html",
  styleUrls: ["./viewer.component.scss"],
})
export class ViewerComponent implements OnInit, OnDestroy {
  conditionExpression: boolean = false;
  selectedUserSub: any;

  constructor(private userService: userService, private logger: LoggerService) {
    this.selectedUserSub = this.userService.selectedUserSub
      .asObservable()
      .subscribe((selectedUser) => {
        this.conditionExpression = selectedUser ? true : false;
      });
    this.logger.infoLog("Viewer", "constructor", "Subscribed!");
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectedUserSub.unsubscribe();
    this.logger.infoLog("Viewer", "ngOnDestroy", "Unsubscribed!");
  }
}

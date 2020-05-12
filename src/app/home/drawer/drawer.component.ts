import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { OpenViewerService } from "src/app/services/open-viewer.service";
import { LoggerService } from "src/app/services/logger.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class DrawerComponent implements OnInit {
  webPackage = "./src/app/home/drawer/drawer.component.ts";

  @Output("selectedUser") selected = new EventEmitter<number>();

  usersSubscription: Subscription;
  users: Array<{ id: number; name: string }> = [];
  selectedUserId: number;

  constructor(
    private userService: UserService,
    private openViewerService: OpenViewerService,
    private logger: LoggerService
  ) {
    this.usersSubscription = this.userService.usersSub
      .asObservable()
      .subscribe((users) => {
        this.users = users;
      });
    this.usersSubscription.subscriberName = "DrawerComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "DrawerComponent",
      functionName: "constructor",
      values: ["Subscribed to users list"],
    });
  }

  ngOnInit(): void {}

  addUser(): void {
    this.users.push({
      id: this.users.length,
      name: `User ${this.users.length + 1}`,
    });
    this.userService.emitUsers(this.users);
  }

  cleanList(): void {
    this.users = [];
    this.selectedUserId = undefined;
    this.userService.emitUsers(this.users);
    this.userService.emitSelected(undefined);
  }

  emitSelected(user): void {
    this.openViewerService.emitView("userInfo");
    this.selected.emit(user.id);
    this.selectedUserId = user.id;
  }
}

import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { LoggerService } from "src/app/services/logger.service";
import { RouteExtensionService } from "src/app/services/route-extension.service";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"],
})
export class ContactsComponent implements OnInit {
  webPackage = "./src/app/home/drawer/contacts/contacts.component.ts";

  usersSubscription: any; // Subscription
  users: Array<{ id: number; name: string }> = [
    { id: 0, name: "User 0" },
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
    { id: 5, name: "User 5" },
    { id: 6, name: "User 6" },
    { id: 7, name: "User 7" },
    { id: 8, name: "User 8" },
    { id: 9, name: "User 9" },
    { id: 10, name: "User 10" },
    { id: 11, name: "User 11" },
    { id: 12, name: "User 12" },
    { id: 13, name: "User 13" },
    { id: 14, name: "User 14" },
    { id: 15, name: "User 15" },
    { id: 16, name: "User 16" },
    { id: 17, name: "User 17" },
    { id: 18, name: "User 18" },
    { id: 19, name: "User 19" },
    { id: 20, name: "User 20" },
  ];

  selectUserSubscription: any; // Subscription
  selectedUserId: number;

  constructor(
    private logger: LoggerService,
    private userService: UserService,
    private route: RouteExtensionService
  ) {
    this.users = this.userService.users ? this.userService.users : this.users;
    this.usersSubscription = this.userService.usersSub
      .asObservable()
      .subscribe((users) => {
        this.users = users;
      });
    this.usersSubscription.subscriberName = "ContactsComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "ContactsComponent",
      functionName: "constructor",
      values: ["Subscribed to users list"],
    });
  }

  ngOnInit(): void {
    this.selectedUserId = this.userService.selectedUser
      ? this.userService.selectedUser.id
      : undefined;
    this.selectUserSubscription = this.route.paramsSubject
      .asObservable()
      .subscribe((urlAfterRedirects) => {
        this.selectedUserId = parseInt(
          urlAfterRedirects.split("/userInfo/")[1]
        );
      });
    this.selectUserSubscription.subscriberName = "ContactsComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "ContactsComponent",
      functionName: "ngOnInit",
      values: ["Subscribed to route"],
    });
  }

  selectTarget(userID): void {
    this.userService.emitSelectedUser(this.users[userID]);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
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

  @Input() selectedUserId: number;
  @Output() selectedUserIdChange: EventEmitter<number> = new EventEmitter<
    number
  >();

  usersSubscription: any; // Subscription
  users: Array<{ id: number; name: string }> = [
    { id: 100, name: "User 0" },
    { id: 101, name: "User 1" },
    { id: 102, name: "User 2" },
    { id: 103, name: "User 3" },
    { id: 104, name: "User 4" },
    { id: 105, name: "User 5" },
    { id: 106, name: "User 6" },
    { id: 107, name: "User 7" },
    { id: 108, name: "User 8" },
    { id: 109, name: "User 9" },
    { id: 110, name: "User 10" },
    { id: 111, name: "User 11" },
    { id: 112, name: "User 12" },
    { id: 113, name: "User 13" },
    { id: 114, name: "User 14" },
    { id: 115, name: "User 15" },
    { id: 116, name: "User 16" },
    { id: 117, name: "User 17" },
    { id: 118, name: "User 18" },
    { id: 119, name: "User 19" },
    { id: 120, name: "User 20" },
  ];

  selectUserSubscription: any; // Subscription

  constructor(private logger: LoggerService, private userService: UserService) {
    this.users = this.userService.contacts
      ? this.userService.contacts
      : this.users;

    this.userService.emitContacts(this.users);
    this.usersSubscription = this.userService.contactsSub
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
    console.log(this.users);
  }
}

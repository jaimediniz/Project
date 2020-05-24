import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserInterface, UserService } from "src/app/services/user.service";
import { LoggerService } from "src/app/services/logger.service";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"],
})
export class ContactsComponent implements OnInit {
  webPackage = "./src/app/components/drawer/contacts/contacts.component.ts";

  @Input() selectedUserId: number;
  @Output() selectedUserIdChange: EventEmitter<number> = new EventEmitter<
    number
  >();

  usersSubscription: any; // Subscription
  users: Array<UserInterface> = [
    { id: 100, name: "User 0", active: true },
    { id: 101, name: "User 1", active: false },
    { id: 102, name: "User 2", active: true },
    { id: 103, name: "User 3", active: false },
    { id: 104, name: "User 4", active: true },
    { id: 105, name: "User 5", active: false },
    { id: 106, name: "User 6", active: true },
    { id: 107, name: "User 7", active: false },
    { id: 108, name: "User 8", active: true },
    { id: 109, name: "User 9", active: false },
    { id: 110, name: "User 10", active: true },
    { id: 111, name: "User 11", active: false },
    { id: 112, name: "User 12", active: true },
    { id: 113, name: "User 13", active: false },
    { id: 114, name: "User 14", active: true },
    { id: 115, name: "User 15", active: false },
    { id: 116, name: "User 16", active: true },
    { id: 117, name: "User 17", active: false },
    { id: 118, name: "User 18", active: true },
    { id: 119, name: "User 19", active: false },
    { id: 120, name: "User 20", active: true },
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

  ngOnInit(): void {}
}

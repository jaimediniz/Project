import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserInterface, UserService } from "src/app/services/user.service";
import { LoggerService } from "src/app/services/logger.service";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"],
})
export class GroupsComponent implements OnInit {
  webPackage = "./src/app/components/drawer/groups/groups.component.ts";

  @Input() selectedUserId: number;
  @Output() selectedUserIdChange: EventEmitter<number> = new EventEmitter<
    number
  >();

  groupsSubscription: any; // Subscription
  groups: Array<UserInterface> = [
    { id: 300, name: "Group 0", active: false },
    { id: 301, name: "Group 1", active: true },
    { id: 302, name: "Group 2", active: false },
    { id: 303, name: "Group 3", active: true },
    { id: 304, name: "Group 4", active: false },
    { id: 305, name: "Group 5", active: true },
    { id: 306, name: "Group 6", active: false },
    { id: 307, name: "Group 7", active: true },
    { id: 308, name: "Group 8", active: false },
    { id: 309, name: "Group 9", active: true },
    { id: 310, name: "Group 10", active: false },
    { id: 311, name: "Group 11", active: true },
    { id: 312, name: "Group 12", active: false },
    { id: 313, name: "Group 13", active: true },
    { id: 314, name: "Group 14", active: false },
    { id: 315, name: "Group 15", active: true },
    { id: 316, name: "Group 16", active: false },
    { id: 317, name: "Group 17", active: true },
    { id: 318, name: "Group 18", active: false },
    { id: 319, name: "Group 19", active: true },
    { id: 320, name: "Group 20", active: false },
  ];

  selectUserSubscription: any; // Subscription

  constructor(private logger: LoggerService, private userService: UserService) {
    this.groups = this.userService.groups
      ? this.userService.groups
      : this.groups;
    this.userService.emitGroups(this.groups);
    this.groupsSubscription = this.userService.groupsSub
      .asObservable()
      .subscribe((groups) => {
        this.groups = groups;
      });
    this.groupsSubscription.subscriberName = "GroupsComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "GroupsComponent",
      functionName: "constructor",
      values: ["Subscribed to invite list"],
    });
  }

  ngOnInit(): void {}
}

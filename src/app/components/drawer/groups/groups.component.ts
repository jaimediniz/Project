import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "src/app/services/user.service";
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
  groups: Array<{ id: number; name: string }> = [
    { id: 200, name: "Group 0" },
    { id: 201, name: "Group 1" },
    { id: 202, name: "Group 2" },
    { id: 203, name: "Group 3" },
    { id: 204, name: "Group 4" },
    { id: 205, name: "Group 5" },
    { id: 206, name: "Group 6" },
    { id: 207, name: "Group 7" },
    { id: 208, name: "Group 8" },
    { id: 209, name: "Group 9" },
    { id: 210, name: "Group 10" },
    { id: 211, name: "Group 11" },
    { id: 212, name: "Group 12" },
    { id: 213, name: "Group 13" },
    { id: 214, name: "Group 14" },
    { id: 215, name: "Group 15" },
    { id: 216, name: "Group 16" },
    { id: 217, name: "Group 17" },
    { id: 218, name: "Group 18" },
    { id: 219, name: "Group 19" },
    { id: 220, name: "Group 20" },
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

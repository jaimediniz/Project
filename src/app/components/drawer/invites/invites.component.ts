import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserInterface, UserService } from "src/app/services/user.service";
import { LoggerService } from "src/app/services/logger.service";

@Component({
  selector: "app-invites",
  templateUrl: "./invites.component.html",
  styleUrls: ["./invites.component.scss"],
})
export class InvitesComponent implements OnInit {
  webPackage = "./src/app/components/drawer/invites/invites.component.ts";

  @Input() selectedUserId: number;
  @Output() selectedUserIdChange: EventEmitter<number> = new EventEmitter<
    number
  >();

  invitesSubscription: any; // Subscription
  invites: Array<UserInterface> = [
    { id: 200, name: "Invite 0", active: true },
    { id: 201, name: "Invite 1", active: true },
    { id: 202, name: "Invite 2", active: true },
    { id: 203, name: "Invite 3", active: false },
    { id: 204, name: "Invite 4", active: true },
    { id: 205, name: "Invite 5", active: false },
    { id: 206, name: "Invite 6", active: true },
    { id: 207, name: "Invite 7", active: false },
    { id: 208, name: "Invite 8", active: true },
    { id: 209, name: "Invite 9", active: false },
    { id: 210, name: "Invite 10", active: true },
    { id: 211, name: "Invite 11", active: false },
    { id: 212, name: "Invite 12", active: true },
    { id: 213, name: "Invite 13", active: false },
    { id: 214, name: "Invite 14", active: true },
    { id: 215, name: "Invite 15", active: false },
    { id: 216, name: "Invite 16", active: true },
    { id: 217, name: "Invite 17", active: false },
    { id: 218, name: "Invite 18", active: true },
    { id: 219, name: "Invite 19", active: false },
    { id: 220, name: "Invite 20", active: true },
  ];

  selectUserSubscription: any; // Subscription

  constructor(private logger: LoggerService, private userService: UserService) {
    this.invites = this.userService.invites
      ? this.userService.invites
      : this.invites;
    this.userService.emitInvites(this.invites);
    this.invitesSubscription = this.userService.invitesSub
      .asObservable()
      .subscribe((invites) => {
        this.invites = invites;
      });
    this.invitesSubscription.subscriberName = "InvitesComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "InvitesComponent",
      functionName: "constructor",
      values: ["Subscribed to invite list"],
    });
  }

  ngOnInit(): void {}
}

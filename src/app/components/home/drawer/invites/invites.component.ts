import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { LoggerService } from "src/app/services/logger.service";
import { RouteExtensionService } from "src/app/services/route-extension.service";

@Component({
  selector: "app-invites",
  templateUrl: "./invites.component.html",
  styleUrls: ["./invites.component.scss"],
})
export class InvitesComponent implements OnInit {
  webPackage = "./src/app/components/home/drawer/invites/invites.component.ts";

  @Input() selectedUserId: number;
  @Output() selectedUserIdChange: EventEmitter<number> = new EventEmitter<
    number
  >();

  invitesSubscription: any; // Subscription
  invites: Array<{ id: number; name: string }> = [
    { id: 300, name: "Invite 0" },
    { id: 301, name: "Invite 1" },
    { id: 302, name: "Invite 2" },
    { id: 303, name: "Invite 3" },
    { id: 304, name: "Invite 4" },
    { id: 305, name: "Invite 5" },
    { id: 306, name: "Invite 6" },
    { id: 307, name: "Invite 7" },
    { id: 308, name: "Invite 8" },
    { id: 309, name: "Invite 9" },
    { id: 310, name: "Invite 10" },
    { id: 311, name: "Invite 11" },
    { id: 312, name: "Invite 12" },
    { id: 313, name: "Invite 13" },
    { id: 314, name: "Invite 14" },
    { id: 315, name: "Invite 15" },
    { id: 316, name: "Invite 16" },
    { id: 317, name: "Invite 17" },
    { id: 318, name: "Invite 18" },
    { id: 319, name: "Invite 19" },
    { id: 320, name: "Invite 20" },
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

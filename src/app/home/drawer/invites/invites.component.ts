import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { LoggerService } from "src/app/services/logger.service";
import { RouteExtensionService } from "src/app/services/route-extension.service";

@Component({
  selector: "app-invites",
  templateUrl: "./invites.component.html",
  styleUrls: ["./invites.component.scss"],
})
export class InvitesComponent implements OnInit {
  webPackage = "./src/app/home/drawer/invites/invites.component.ts";

  invitesSubscription: any; // Subscription
  invites: Array<{ id: number; name: string }> = [
    { id: 0, name: "Invite 0" },
    { id: 1, name: "Invite 1" },
    { id: 2, name: "Invite 2" },
    { id: 3, name: "Invite 3" },
    { id: 4, name: "Invite 4" },
    { id: 5, name: "Invite 5" },
    { id: 6, name: "Invite 6" },
    { id: 7, name: "Invite 7" },
    { id: 8, name: "Invite 8" },
    { id: 9, name: "Invite 9" },
    { id: 10, name: "Invite 10" },
    { id: 11, name: "Invite 11" },
    { id: 12, name: "Invite 12" },
    { id: 13, name: "Invite 13" },
    { id: 14, name: "Invite 14" },
    { id: 15, name: "Invite 15" },
    { id: 16, name: "Invite 16" },
    { id: 17, name: "Invite 17" },
    { id: 18, name: "Invite 18" },
    { id: 19, name: "Invite 19" },
    { id: 20, name: "Invite 20" },
  ];

  selectUserSubscription: any; // Subscription
  selectedUserId: number;

  constructor(
    private logger: LoggerService,
    private userService: UserService,
    private route: RouteExtensionService
  ) {
    this.invites = this.userService.invites
      ? this.userService.invites
      : this.invites;
    this.invitesSubscription = this.userService.usersSub
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

  ngOnInit(): void {
    this.selectedUserId = this.userService.selectedUser
      ? this.userService.selectedUser.id
      : undefined;
    this.selectUserSubscription = this.route.paramsSubject
      .asObservable()
      .subscribe((urlAfterRedirects) => {
        this.selectedUserId = parseInt(
          urlAfterRedirects.split("/inviteInfo/")[1]
        );
      });
    this.selectUserSubscription.subscriberName = "InvitesComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "InvitesComponent",
      functionName: "ngOnInit",
      values: ["Subscribed to route"],
    });
  }

  selectTarget(userID): void {
    this.userService.emitSelectedInvite(this.invites[userID]);
  }
}

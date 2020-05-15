import { Subject } from "rxjs";

import { Injectable } from "@angular/core";

import { LoggerService } from "./logger.service";

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  users: Array<User>;
  usersSub = new Subject<Array<User>>();

  selectedUser: User;
  selectedUserSub = new Subject<User>();

  groups: Array<User>;
  groupsSub = new Subject<Array<User>>();

  selectedGroup: User;
  selectedGroupSub = new Subject<User>();

  invites: Array<User>;
  invitesSub = new Subject<Array<User>>();

  selectedInvite: User;
  selectedInviteSub = new Subject<User>();

  emitLog(functionName, variable, subscribers) {
    this.logger.emitLog({
      className: "UserService",
      functionName,
      description: "Emit new value",
      variable,
      value: variable,
      subscribers,
    });
  }

  emitUsers(users: Array<User>): void {
    this.emitLog("emitUsers", users, this.usersSub.observers);
    this.users = users;
    this.usersSub.next(users);
  }

  emitSelectedUser(selectedUser: User): void {
    this.emitLog(
      "emitSelectedUser",
      selectedUser,
      this.selectedUserSub.observers
    );
    this.selectedUser = selectedUser;
    this.selectedUserSub.next(selectedUser);
  }

  emitGroups(groups: Array<User>): void {
    this.emitLog("emitGroups", groups, this.groupsSub.observers);
    this.groups = groups;
    this.groupsSub.next(groups);
  }

  emitSelectedGroup(selectedGroup: User): void {
    this.emitLog(
      "emitSelectedGroup",
      selectedGroup,
      this.selectedGroupSub.observers
    );
    this.selectedGroup = selectedGroup;
    this.selectedGroupSub.next(selectedGroup);
  }

  emitInvites(users: Array<User>): void {
    this.emitLog("emitInvites", users, this.usersSub.observers);
    this.users = users;
    this.usersSub.next(users);
  }

  emitSelectedInvite(selectedInvite: User): void {
    this.emitLog(
      "emitSelectedInvite",
      selectedInvite,
      this.selectedInviteSub.observers
    );
    this.selectedInvite = selectedInvite;
    this.selectedInviteSub.next(selectedInvite);
  }

  constructor(private logger: LoggerService) {}
}

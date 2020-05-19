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
  activatedRoute: any;

  selectedUserId: number = 0;
  selectedUser: User = { id: 0, name: "" };
  selectedUserSub = new Subject<User>();

  contacts: Array<User>;
  contactsSub = new Subject<Array<User>>();

  groups: Array<User>;
  groupsSub = new Subject<Array<User>>();

  invites: Array<User>;
  invitesSub = new Subject<Array<User>>();

  emitLog(functionName, variableName, variable, subscribers) {
    this.logger.emitLog({
      className: "UserService",
      functionName,
      description: "Emit new value",
      variable: variableName,
      value: variable,
      subscribers,
    });
  }

  emitSelectedUserId(selectedUserId: number): void {
    if (!selectedUserId)
      return this.emitSelectedUser({ id: undefined, name: "" });

    if (this.selectedUserId !== selectedUserId) {
      for (const list of [this.contacts, this.groups, this.invites]) {
        for (const user of Object.values(list)) {
          if (user.id === selectedUserId) {
            return this.emitSelectedUser(user);
          }
        }
      }
    }
  }

  emitSelectedUser(user: User) {
    this.emitLog(
      "emitSelectedUser",
      "user",
      user,
      this.selectedUserSub.observers
    );
    this.selectedUser = user;
    this.selectedUserId = user.id;
    this.selectedUserSub.next(this.selectedUser);
  }

  emitContacts(contacts: Array<User>): void {
    if (this.contacts !== contacts) {
      this.emitLog(
        "emitContacts",
        "contacts",
        contacts,
        this.contactsSub.observers
      );
      this.contacts = contacts;
      this.contactsSub.next(contacts);
    }
  }

  emitGroups(groups: Array<User>): void {
    if (this.groups !== groups) {
      this.emitLog("emitGroups", "groups", groups, this.groupsSub.observers);
      this.groups = groups;
      this.groupsSub.next(groups);
    }
  }

  emitInvites(invites: Array<User>): void {
    if (this.invites !== invites) {
      this.emitLog(
        "emitInvites",
        "invites",
        invites,
        this.invitesSub.observers
      );
      this.invites = invites;
      this.invitesSub.next(invites);
    }
  }

  constructor(private logger: LoggerService) {}
}

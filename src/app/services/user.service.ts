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

  selectedUserId: number;
  selectedUserIdSub = new Subject<number>();

  contacts: Array<User>;
  contactsSub = new Subject<Array<User>>();

  selectedContact: User;
  selectedContactSub = new Subject<User>();

  groups: Array<User>;
  groupsSub = new Subject<Array<User>>();

  selectedGroup: User;
  selectedGroupSub = new Subject<User>();

  invites: Array<User>;
  invitesSub = new Subject<Array<User>>();

  selectedInvite: User;
  selectedInviteSub = new Subject<User>();

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
    this.emitLog(
      "emitSelectedUserId",
      "selectedUserId",
      selectedUserId,
      this.selectedUserIdSub.observers
    );
    this.selectedUserId = selectedUserId;
    this.selectedUserIdSub.next(this.selectedUserId);
  }

  emitContacts(contacts: Array<User>): void {
    this.emitLog(
      "emitContacts",
      "contacts",
      contacts,
      this.contactsSub.observers
    );
    this.contacts = contacts;
    this.contactsSub.next(contacts);
  }

  emitSelectedContact(selectedContact: number): void {
    this.emitLog(
      "emitSelectedContact",
      "selectedContact",
      selectedContact,
      this.selectedContactSub.observers
    );
    this.selectedContact = this.contacts.filter(
      (contact) => contact.id === selectedContact
    )[0];
    console.log(selectedContact);
    this.selectedContactSub.next(this.selectedContact);
  }

  emitGroups(groups: Array<User>): void {
    this.emitLog("emitGroups", "groups", groups, this.groupsSub.observers);
    this.groups = groups;
    this.groupsSub.next(groups);
  }

  emitSelectedGroup(selectedGroup: number): void {
    this.emitLog(
      "emitSelectedGroup",
      "selectedGroup",
      selectedGroup,
      this.selectedGroupSub.observers
    );
    this.selectedGroup = this.groups.filter(
      (group) => group.id === selectedGroup
    )[0];
    this.selectedGroupSub.next(this.selectedGroup);
  }

  emitInvites(invites: Array<User>): void {
    this.emitLog("emitInvites", "invites", invites, this.invitesSub.observers);
    this.invites = invites;
    this.invitesSub.next(invites);
  }

  emitSelectedInvite(selectedInvite: number): void {
    this.emitLog(
      "emitSelectedInvite",
      "selectedInvite",
      selectedInvite,
      this.selectedInviteSub.observers
    );
    this.selectedInvite = this.invites.filter(
      (invite) => invite.id === selectedInvite
    )[0];
    this.selectedInviteSub.next(this.selectedInvite);
  }

  constructor(private logger: LoggerService) {}
}

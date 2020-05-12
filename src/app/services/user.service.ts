import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LoggerService } from "./logger.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  users: Array<{ id: number; name: string }>;
  usersSub = new Subject<Array<{ id: number; name: string }>>();

  selectedUser: { id: number; name: string };
  selectedUserSub = new Subject<{ id: number; name: string }>();

  emitUsers(users: Array<{ id: number; name: string }>): void {
    this.logger.emitLog({
      className: "UserService",
      functionName: "emitUsers",
      description: "Emit new Array<{ id: number; name: string }>",
      variable: "users",
      value: users,
      subscribers: this.usersSub.observers,
    });
    this.users = users;
    this.usersSub.next(users);
  }

  emitSelected(selectedUser: { id: number; name: string }): void {
    this.logger.emitLog({
      className: "UserService",
      functionName: "emitSelected",
      description: "Emit new { id: number; name: string }",
      variable: "selectedUser",
      value: selectedUser,
      subscribers: this.selectedUserSub.observers,
    });
    this.selectedUser = selectedUser;
    this.selectedUserSub.next(selectedUser);
  }

  constructor(private logger: LoggerService) {}
}

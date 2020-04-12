import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class userService {
  users: Array<{ id: number; name: string }>;
  usersSub = new Subject<Array<{ id: number; name: string }>>();

  selectedUser: { id: number; name: string };
  selectedUserSub = new Subject<{ id: number; name: string }>();

  emitUsers(users: Array<{ id: number; name: string }>): void {
    this.users = users;
    this.usersSub.next(users);
  }

  emitSelected(selectedUser: { id: number; name: string }): void {
    this.selectedUser = selectedUser;
    this.selectedUserSub.next(selectedUser);
  }

  constructor() {}
}

import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { userService } from "src/app/services/user.service";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class DrawerComponent implements OnInit {
  users: Array<{ id: number; name: string }> = [];
  @Output("selectedUser") selected = new EventEmitter<number>();

  selectedUserId: number;

  constructor(private userService: userService) {
    this.userService.usersSub.asObservable().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnInit(): void {}

  addUser(): void {
    this.users.push({
      id: this.users.length,
      name: `User ${this.users.length + 1}`,
    });
    this.userService.emitUsers(this.users);
  }

  cleanList(): void {
    this.users = [];
    this.selectedUserId = undefined;
    this.userService.emitUsers(this.users);
    this.userService.emitSelected(undefined);
  }

  emitSelected(user): void {
    this.selected.emit(user.id);
    this.selectedUserId = user.id;
  }
}

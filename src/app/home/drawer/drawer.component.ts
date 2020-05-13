import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { OpenViewerService } from "src/app/services/open-viewer.service";
import { LoggerService } from "src/app/services/logger.service";
import { Subscription } from "rxjs";
import { NotificationsService } from "src/app/services/notifications.service";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class DrawerComponent implements OnInit, OnDestroy {
  webPackage = "./src/app/home/drawer/drawer.component.ts";

  @Output("selectedUser") selected = new EventEmitter<number>();

  usersSubscription: any; // Subscription
  users: Array<{ id: number; name: string }> = [];

  selectUserSubscription: any; // Subscription
  selectedUserId: number;

  private muteAudioSub: any; // Subject
  public mute = false;

  constructor(
    private userService: UserService,
    private openViewerService: OpenViewerService,
    private logger: LoggerService,
    private notificationsService: NotificationsService
  ) {
    this.users = this.userService.users ? this.userService.users : [];
    this.usersSubscription = this.userService.usersSub
      .asObservable()
      .subscribe((users) => {
        this.users = users;
      });
    this.usersSubscription.subscriberName = "DrawerComponent";

    this.selectedUserId = this.userService.selectedUser
      ? this.userService.selectedUser.id
      : undefined;
    this.selectUserSubscription = this.userService.selectedUserSub
      .asObservable()
      .subscribe((selectedUserId) => {
        this.selectedUserId = selectedUserId.id;
      });
    this.selectUserSubscription.subscriberName = "DrawerComponent";

    this.mute = this.notificationsService.muteAudio;
    this.muteAudioSub = this.notificationsService.muteAudioSub
      .asObservable()
      .subscribe((muteAudio) => {
        this.mute = muteAudio;
      });
    this.muteAudioSub.subscriberName = "SideBarComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "DrawerComponent",
      functionName: "constructor",
      values: [
        "Subscribed to users list",
        "Subscribed to selected user",
        "Subscribed to audio status",
      ],
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
    this.openViewerService.emitView("userInfo");
    this.selected.emit(user.id);
    this.selectedUserId = user.id;
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
    this.selectUserSubscription.unsubscribe();
    this.muteAudioSub.unsubscribe();

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "UserInfoComponent",
      functionName: "ngOnDestroy",
      values: [
        "Unsubscribed from users list",
        "Unsubscribed from selected user",
        "Unsubscribed from audio status",
      ],
    });
  }
}

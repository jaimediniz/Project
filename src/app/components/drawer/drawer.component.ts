import { Subscription } from "rxjs";
import { LoggerService } from "src/app/services/logger.service";

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { NavBarService } from "src/app/services/navbar.service";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class DrawerComponent implements OnInit, OnDestroy {
  webPackage = "./src/app/components/drawer/drawer.component.ts";

  @Input() opened: boolean;
  @Output() open = new EventEmitter<number>();
  @Output() close = new EventEmitter<boolean>();
  @Output("selectedUser") selected = new EventEmitter<number>();

  @Input() selectedUserId: number;
  @Output() selectedUserIdChange = new EventEmitter<number>();

  private muteAudioSub: any; // Subject
  public mute = false;

  tab: number = 0;

  public contactsUnreadMessages: number = 8;
  public groupsUnreadMessages: number = 100;
  public invitesUnreadMessages: number = 5;

  private selectedUserSub: any; // Subject<number>;
  private selectedTabSub: any;
  public settingsPanel = false;

  constructor(
    private logger: LoggerService,
    private navbar: NavBarService,
    private userService: UserService
  ) {
    this.mute = this.navbar.muteAudio;

    this.selectedTabSub = this.navbar.changeTabSub
      .asObservable()
      .subscribe((changeTab) => {
        this.handleOpening(changeTab);
      });
    this.selectedTabSub.subscriberName = "DrawerComponent";

    this.muteAudioSub = this.navbar.muteAudioSub
      .asObservable()
      .subscribe((muteAudio) => {
        this.mute = muteAudio;
      });
    this.muteAudioSub.subscriberName = "DrawerComponent";

    this.selectedUserId = this.userService.selectedUser.id;
    this.selectedUserSub = this.userService.selectedUserSub
      .asObservable()
      .subscribe((selectedUser) => {
        this.selectedUserId = selectedUser.id;
      });
    this.selectedUserSub.subscriberName = "DrawerComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "DrawerComponent",
      functionName: "constructor",
      values: ["Subscribed to audio status", "Subscribe to selected user"],
    });
  }

  ngOnInit(): void {}

  handleOpening(selectTab) {
    if (selectTab === -1) {
      if (this.opened) {
        return;
      }
      this.open.emit(this.tab);
      this.opened = true;
      return;
    }

    this.tab = selectTab;
    if (this.opened) {
      return;
    }
    this.open.emit(selectTab);
    this.opened = true;
  }

  toggleMute() {
    this.mute = !this.mute;
    this.navbar.emitAudioMuted(this.mute);
  }

  ngOnDestroy(): void {
    this.muteAudioSub.unsubscribe();

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "UserInfoComponent",
      functionName: "ngOnDestroy",
      values: ["Unsubscribed from audio status"],
    });
  }
}

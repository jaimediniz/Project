import { Subject } from "rxjs";
import { LoggerService } from "src/app/services/logger.service";
import { NotificationsService } from "src/app/services/notifications.service";

import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Input,
} from "@angular/core";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit, OnDestroy {
  webPackage = "./src/app/home/drawer/side-bar/side-bar.component.ts";

  @Input() opened: boolean;
  @Output() open = new EventEmitter<number>();
  @Output() close = new EventEmitter<number>();

  private muteAudioSub: any; // Subject
  public mute = false;
  public contactsUnreadMessages: number = 8;
  public groupsUnreadMessages: number = 9;
  public invitesUnreadMessages: number = 5;

  constructor(
    private notificationsService: NotificationsService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {}

  toggleMute() {
    this.mute = !this.mute;
    this.notificationsService.emitAudioMuted(this.mute);
  }

  ngOnDestroy(): void {
    this.muteAudioSub.unsubscribe();
    // this.notificationsService.emitAudioMuted(false);

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "SideBarComponent",
      functionName: "ngOnDestroy",
      values: ["Unsubscribed from audio status"],
    });
  }
}

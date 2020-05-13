import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { OpenViewerService } from "src/app/services/open-viewer.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { Subject } from "rxjs";
import { LoggerService } from "src/app/services/logger.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit, OnDestroy {
  webPackage = "./src/app/home/drawer/side-bar/side-bar.component.ts";

  @Output() open = new EventEmitter<number>();

  private muteAudioSub: any; // Subject
  public mute = false;
  public contactsUnreadMessages: number = 8;
  public groupsUnreadMessages: number = 9;
  public invitesUnreadMessages: number = 5;

  constructor(
    private openViewerService: OpenViewerService,
    private notificationsService: NotificationsService,
    private logger: LoggerService
  ) {
    this.mute = this.notificationsService.muteAudio;
    this.muteAudioSub = this.notificationsService.muteAudioSub
      .asObservable()
      .subscribe((muteAudio) => {
        this.mute = muteAudio;
      });
    this.muteAudioSub.subscriberName = "SideBarComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "SideBarComponent",
      functionName: "constructor",
      values: ["Subscribed to audio status"],
    });
  }

  ngOnInit(): void {}

  emitView(view) {
    this.openViewerService.emitView(view);
  }

  toggleMute() {
    this.notificationsService.emitAudioMuted(!this.mute);
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

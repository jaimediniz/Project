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
import { RouteExtensionService } from "src/app/services/route-extension.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit, OnDestroy {
  webPackage = "./src/app/home/drawer/side-bar/side-bar.component.ts";

  @Input() opened: boolean;
  @Output() open = new EventEmitter<number>();
  @Output() close = new EventEmitter<boolean>();

  private muteAudioSub: any; // Subject
  public mute = false;
  public contactsUnreadMessages: number = 8;
  public groupsUnreadMessages: number = 9;
  public invitesUnreadMessages: number = 5;

  private activatedRoute: any; // Subject<string>;
  public settingsPanel = false;

  constructor(
    private notificationsService: NotificationsService,
    private logger: LoggerService,
    private route: RouteExtensionService
  ) {}

  ngOnInit(): void {
    this.activatedRoute = this.route.paramsSubject
      .asObservable()
      .subscribe((urlAfterRedirects) => {
        this.settingsPanel = urlAfterRedirects.includes("/settings");
      });
    this.activatedRoute.subscriberName = "ViewerComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "ViewerComponent",
      functionName: "ngOnInit",
      values: ["Subscribed to route"],
    });
  }

  toggleMute() {
    this.mute = !this.mute;
    this.notificationsService.emitAudioMuted(this.mute);
  }

  ngOnDestroy(): void {
    // this.notificationsService.emitAudioMuted(false);

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "SideBarComponent",
      functionName: "ngOnDestroy",
      values: ["Unsubscribed from audio status"],
    });
  }
}

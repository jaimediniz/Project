import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { OpenViewerService } from "src/app/services/open-viewer.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit, OnDestroy {
  @Output() open = new EventEmitter<number>();
  public mute = false;
  public contactsUnreadMessages: number = 8;
  public groupsUnreadMessages: number = 9;
  public invitesUnreadMessages: number = 5;

  constructor(private openViewerService: OpenViewerService) {}

  ngOnInit(): void {}

  emitView(view) {
    this.openViewerService.emitView(view);
  }

  ngOnDestroy(): void {}
}

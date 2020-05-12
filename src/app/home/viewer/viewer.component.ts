import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OpenViewerService } from "../../services/open-viewer.service";
import { LoggerService } from "src/app/services/logger.service";

@Component({
  selector: "app-viewer",
  templateUrl: "./viewer.component.html",
  styleUrls: ["./viewer.component.scss"],
})
export class ViewerComponent implements OnInit, OnDestroy {
  conditionExpression: any = false;
  selectedViewerSub: any;

  constructor(
    private openViewerService: OpenViewerService,
    private logger: LoggerService
  ) {
    this.selectedViewerSub = this.openViewerService.selectedViewerSub
      .asObservable()
      .subscribe((selectedViewer) => {
        this.conditionExpression = selectedViewer;
      });
    this.logger.infoLog({
      component: "Viewer",
      codePart: "constructor",
      variable: "Subscribed!",
      color: "blue",
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectedViewerSub.unsubscribe();
    this.logger.infoLog({
      component: "Viewer",
      codePart: "ngOnDestroy",
      variable: "Unsubscribed!",
      color: "red",
    });
  }
}

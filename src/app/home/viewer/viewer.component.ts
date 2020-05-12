import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OpenViewerService } from "../../services/open-viewer.service";
import { LoggerService } from "src/app/services/logger.service";
import { Subscription } from "rxjs";
import { RouteExtensionService } from "src/app/services/route-extension.service";

@Component({
  selector: "app-viewer",
  templateUrl: "./viewer.component.html",
  styleUrls: ["./viewer.component.scss"],
})
export class ViewerComponent implements OnInit, OnDestroy {
  webPackage = "./src/app/home/viewer/viewer.component.ts";

  conditionExpression: any = false;
  selectedViewerSub: any;
  activatedRoute: any; // Subscription

  constructor(
    private logger: LoggerService,
    private route: RouteExtensionService
  ) {}

  ngOnInit(): void {
    this.activatedRoute = this.route.queryParamsSubject
      .asObservable()
      .subscribe((params) => {
        this.conditionExpression = params["name"];
      });
    this.activatedRoute.subscriberName = "ViewerComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "ViewerComponent",
      functionName: "ngOnInit",
      values: ["Subscribed to route"],
    });
  }

  ngOnDestroy(): void {
    this.activatedRoute.unsubscribe();

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "ViewerComponent",
      functionName: "ngOnDestroy",
      values: ["Unsubscribed from route"],
    });
  }
}

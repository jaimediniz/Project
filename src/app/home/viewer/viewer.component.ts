import { Subscription } from "rxjs";
import { LoggerService } from "src/app/services/logger.service";
import { RouteExtensionService } from "src/app/services/route-extension.service";

import { Component, Input, OnDestroy, OnInit } from "@angular/core";

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
    this.activatedRoute = this.route.paramsSubject
      .asObservable()
      .subscribe((urlAfterRedirects) => {
        this.conditionExpression = urlAfterRedirects;
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

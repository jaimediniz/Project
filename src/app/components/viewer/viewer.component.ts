import { Subscription } from "rxjs";
import { LoggerService } from "src/app/services/logger.service";
import { RouteExtensionService } from "src/app/services/route-extension.service";

import { Component, OnDestroy, OnInit, Output } from "@angular/core";
import { ViewerService } from "src/app/services/viewer-service.service";

@Component({
  selector: "app-viewer",
  templateUrl: "./viewer.component.html",
  styleUrls: ["./viewer.component.scss"],
})
export class ViewerComponent implements OnInit, OnDestroy {
  webPackage = "./src/app/components/viewer/viewer.component.ts";

  conditionExpression: any = false;
  selectedViewerSub: any;
  activatedRoute: any; // Subscription

  width: number = window.innerWidth;
  height: number = window.innerHeight;
  mobileWidth: number = 768;
  isMobile: boolean = false;

  constructor(
    private logger: LoggerService,
    private route: RouteExtensionService,
    private viewerService: ViewerService
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

  onResized(event) {
    this.width = event.newWidth;
    if (this.isMobile !== this.width < this.mobileWidth) {
      this.isMobile = this.width < this.mobileWidth;
      this.viewerService.emitIsMobile(this.isMobile);
    }
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

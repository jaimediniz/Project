import { Component, OnInit } from "@angular/core";
import { MobileService } from "src/app/services/mobile.service";
import { LoggerService } from "src/app/services/logger.service";

@Component({
  selector: "app-components-collection",
  templateUrl: "./components-collection.component.html",
  styleUrls: ["./components-collection.component.scss"],
})
export class ComponentsCollectionComponent implements OnInit {
  webPackage =
    "./src/app/components/viewer/dashboard/components-collection.component.ts";

  isMobileSub: any;
  isMobile: boolean;

  constructor(
    private logger: LoggerService,
    private mobileService: MobileService
  ) {
    this.isMobileSub = this.mobileService.isViewerMobileSub.subscribe(
      (isViewerMobile) => {
        this.isMobile = isViewerMobile;
      }
    );
    this.isMobileSub.subscriberName = "ComponentsCollectionComponent";

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "ComponentsCollectionComponent",
      functionName: "constructor",
      values: ["Subscribed to viewer isMobile"],
    });
  }

  ngOnInit(): void {}
}

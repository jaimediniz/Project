import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoggerService } from "./logger.service";
import { RouteExtensionService } from "./route-extension.service";

@Injectable({
  providedIn: "root",
})
export class MobileService {
  emitLog(functionName, variableName, variable, subscribers) {
    this.logger.emitLog({
      className: "MobileService",
      functionName,
      description: "Emit new viewer width",
      variable: variableName,
      value: variable,
      subscribers,
    });
  }

  isMobileSub: BehaviorSubject<boolean> = new BehaviorSubject(false);

  emitIsMobile(isMobile: boolean): void {
    if (!isMobile) this.changeForbiddenRoute();
    this.emitLog(
      "emitIsMobile",
      "isMobile",
      isMobile,
      this.isMobileSub.observers
    );
    this.isMobileSub.next(isMobile);
  }

  isViewerMobileSub: BehaviorSubject<boolean> = new BehaviorSubject(false);

  emitViewerMobile(isMobile: boolean): void {
    this.emitLog(
      "emitViewerMobile",
      "isViewerMobile",
      isMobile,
      this.isViewerMobileSub.observers
    );
    this.isViewerMobileSub.next(isMobile);
  }

  changeForbiddenRoute() {
    if (
      this.route.paramsSubject.value === "/contacts" ||
      this.route.paramsSubject.value === "/groups" ||
      this.route.paramsSubject.value === "/invites"
    ) {
      this.route.navigate(["home"]);
    }
  }

  constructor(
    private logger: LoggerService,
    private route: RouteExtensionService
  ) {}
}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoggerService } from "./logger.service";

@Injectable({
  providedIn: "root",
})
export class ViewerService {
  emitLog(functionName, variableName, variable, subscribers) {
    this.logger.emitLog({
      className: "ViewerService",
      functionName,
      description: "Emit new viewer width",
      variable: variableName,
      value: variable,
      subscribers,
    });
  }

  isMobileSub: BehaviorSubject<boolean> = new BehaviorSubject(false);

  emitIsMobile(isMobile: boolean): void {
    this.emitLog(
      "emitIsMobile",
      "isMobile",
      isMobile,
      this.isMobileSub.observers
    );
    this.isMobileSub.next(isMobile);
  }

  constructor(private logger: LoggerService) {}
}

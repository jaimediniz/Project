import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoggerService } from "./logger.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RouteExtensionService {
  queryParamsSubject = new Subject();

  constructor(private logger: LoggerService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.logger.emitLog({
        className: "RouteExtensionService",
        functionName: "constructor",
        description: "Emit new {[key: string]: any;};",
        variable: "params",
        value: params,
        subscribers: this.queryParamsSubject.observers,
      });
      this.queryParamsSubject.next(params);
    });
  }
}

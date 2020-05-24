import { Subject } from "rxjs";

import { Injectable } from "@angular/core";

import { LoggerService } from "./logger.service";

@Injectable({
  providedIn: "root",
})
export class NavBarService {
  emitLog(functionName, variableName, variable, subscribers) {
    this.logger.emitLog({
      className: "NavBarService",
      functionName,
      description: "Emit new value",
      variable: variableName,
      value: variable,
      subscribers,
    });
  }

  changeTabSub = new Subject<number>();

  emitSelectedTab(changeTab: number): void {
    this.emitLog(
      "emitSelectedTab",
      "changeTab",
      changeTab,
      this.changeTabSub.observers
    );
    this.changeTabSub.next(changeTab);
  }

  muteAudio = false;
  muteAudioSub = new Subject<boolean>();

  emitAudioMuted(muteAudio: boolean): void {
    this.emitLog(
      "emitAudioMuted",
      "muteAudio",
      muteAudio,
      this.changeTabSub.observers
    );
    this.muteAudio = muteAudio;
    this.muteAudioSub.next(muteAudio);
  }

  constructor(private logger: LoggerService) {}
}

import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  muteAudio = false;
  muteAudioSub = new Subject<boolean>();

  emitAudioMuted(muteAudio: boolean): void {
    this.logger.emitLog({
      className: "NotificationsService",
      functionName: "emitAudioChange",
      description: "Emit new boolean value",
      variable: "muteAudio",
      value: muteAudio,
      subscribers: this.muteAudioSub.observers,
    });
    this.muteAudio = muteAudio;
    this.muteAudioSub.next(muteAudio);
  }

  constructor(private logger: LoggerService) {}
}

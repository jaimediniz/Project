import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoggerService {
  constructor() {
    this.setVerbosity(2);
  }

  setVerbosity(verbosity: number): void {
    switch (verbosity) {
      case 0: {
        window.console.error = function () {};
        window.console.warn = function () {};
        window.console.error = function () {};
      }
      case 1: {
        window.console.log = function () {};
        window.console.warn = function () {};
      }
    }
  }

  infoLog(component: string, codePart: string, variable: any): void {
    console.log(`${component} -> ${codePart}, ${variable}`);
  }

  warnLog(component: string, codePart: string, variable: any): void {
    console.warn(`${component} -> ${codePart}, ${variable}`);
  }

  errorLog(component: string, codePart: string, variable: any): void {
    console.error(`${component} -> ${codePart}, ${variable}`);
  }
}

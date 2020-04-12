import { Injectable } from "@angular/core";

declare global {
  interface Window {
    setVerbosity: any;
    checkVerbosity: any;
    verbosity: number;
    logLevel: object;
  }
}

@Injectable({
  providedIn: "root",
})
export class LoggerService {
  constructor() {
    window.setVerbosity = this.setVerbosity;
    window.checkVerbosity = this.checkVerbosity;
    window.logLevel = {
      0: "All",
      1: "Debug",
      2: "Info",
      3: "Warn",
      4: "Error",
      5: "Fatal",
      6: "Off",
    };
    this.setVerbosity(0);
  }

  checkVerbosity(): string {
    console.dir(window.logLevel);
    return `Verbositz is -> ${window.logLevel[window.verbosity]}`;
  }

  setVerbosity(verbosity: number): string {
    window.verbosity = verbosity;
    return `Verbositz set to -> ${window.verbosity}`;
  }

  infoLog(component: string, codePart: string, variable: any): void {
    if (window.verbosity === 0 || window.verbosity === 2) {
      console.dir(`${component} -> ${codePart}, ${variable}`);
    }
  }

  warnLog(component: string, codePart: string, variable: any): void {
    if (window.verbosity === 0 || window.verbosity === 3) {
      console.warn(`${component} -> ${codePart}, ${variable}`);
    }
  }

  errorLog(component: string, codePart: string, variable: any): void {
    if (window.verbosity === 0 || window.verbosity === 4) {
      console.error(`${component} -> ${codePart}, ${variable}`);
    }
  }
}

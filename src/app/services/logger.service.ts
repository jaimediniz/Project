import { Injectable } from "@angular/core";

declare global {
  interface Window {
    setVerbosity: any;
    checkVerbosity: any;
    verbosity: number;
    logLevel: object;
  }
}

const COLORS = {
  black: "#000000",
  blue: "#007bff",
  green: "#28a745",
  yellow: "#ffd740",
  red: "#dc3545",
};

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
    return `Verbosity set to -> ${window.verbosity}`;
  }

  infoLog({
    component,
    codePart,
    variable,
    color = "black",
  }: {
    component: string;
    codePart: string;
    variable: any;
    color?: string;
  }): void {
    if (window.verbosity === 0 || window.verbosity === 2) {
      console.log(
        `%c ${component} -> ${codePart}, ${variable}`,
        `color: ${COLORS[color]}`
      );
    }
  }

  warnLog({
    component,
    codePart,
    variable,
    color = "black",
  }: {
    component: string;
    codePart: string;
    variable: any;
    color?: string;
  }): void {
    if (window.verbosity === 0 || window.verbosity === 3) {
      console.warn(
        `%c ${component} -> ${codePart}, ${variable}`,
        `color: ${COLORS[color]}`
      );
    }
  }

  errorLog({
    component,
    codePart,
    variable,
    color = "black",
  }: {
    component: string;
    codePart: string;
    variable: any;
    color?: string;
  }): void {
    if (window.verbosity === 0 || window.verbosity === 4) {
      console.error(
        `%c${component} -> ${codePart}, ${variable}`,
        `color: ${COLORS[color]}`
      );
    }
  }
}

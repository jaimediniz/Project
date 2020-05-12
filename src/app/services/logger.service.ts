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
  yellow: "#ffd740",
  red: "#dc3545",
  subscriptionChanged: "#28a745",
  functions: {
    constructor: "#ea44d5",
    ngOnInit: "#007bff",
    ngOnAfterInitialView: "#ffd740",
    ngOnDestroy: "#dc3545",
  },
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
    return `Verbosity is -> ${window.logLevel[window.verbosity]}`;
  }

  setVerbosity(verbosity: number): string {
    window.verbosity = verbosity;
    return `Verbosity set to -> ${window.verbosity}`;
  }

  infoLog({
    className,
    functionName,
    description,
    variable,
    value,
    color = "black",
  }: {
    className: string;
    functionName: string;
    description: string;
    variable: string;
    value: boolean | string | number | object;
    color?: string;
  }): void {
    if (window.verbosity === 0 || window.verbosity === 2) {
      console.log(
        `%c ${className} -> ${functionName}:\n    Description: ${description}\n    Variable: ${variable} |`,
        `color: ${COLORS[color]}`,
        value
      );
    }
  }

  warnLog({
    className,
    functionName,
    description,
    variable,
    value,
    color = "black",
  }: {
    className: string;
    functionName: string;
    description: string;
    variable: string;
    value: boolean | string | number | object;
    color?: string;
  }): void {
    if (window.verbosity === 0 || window.verbosity === 3) {
      console.warn(
        `%c ${className} -> ${functionName}:\n    Description: ${description}\n    Variable: ${variable} |`,
        `color: ${COLORS[color]}`,
        value
      );
    }
  }

  errorLog({
    className,
    functionName,
    description,
    variable,
    value,
    color = "black",
  }: {
    className: string;
    functionName: string;
    description: string;
    variable: string;
    value: boolean | string | number | object;
    color?: string;
  }): void {
    if (window.verbosity === 0 || window.verbosity === 4) {
      console.error(
        `%c ${className} -> ${functionName}:\n    Description: ${description}\n    Variable: ${variable} |`,
        `color: ${COLORS[color]}`,
        value
      );
    }
  }

  emitLog({
    className,
    functionName,
    description,
    variable,
    value,
    subscribers,
  }: {
    className: string;
    functionName: string;
    description: string;
    variable: string;
    value: boolean | string | number | object;
    subscribers: Array<any>;
  }): void {
    if (window.verbosity === 0) {
      let compiledString = "";
      subscribers.forEach((element) => {
        compiledString += `        - ${element.subscriberName};\n`;
      });
      if (compiledString) {
        compiledString = `${compiledString.slice(0, -2)}.`;
      }

      console.log(
        `%c ${className} -> ${functionName}:\n    Description: ${description}\n    Subscribers:\n${compiledString}\n    Variable: ${variable} |`,
        `color: ${COLORS.subscriptionChanged}`,
        value
      );
    }
  }

  functionLog({
    webPackage,
    className,
    functionName,
    values,
  }: {
    webPackage: string;
    className: string;
    functionName: string;
    values: Array<string>;
  }): void {
    if (window.verbosity === 0) {
      let compiledString = "";
      values.forEach((element) => {
        compiledString += `    - ${element};\n`;
      });
      if (compiledString) {
        compiledString = `${compiledString.slice(0, -2)}.`;
      }

      console.log(
        `%c ${className} -> webpack:///${webPackage}\n  ${functionName}:\n${compiledString}`,
        `color: ${COLORS.functions[functionName]}`
      );
    }
  }
}

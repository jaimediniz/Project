import { Component, OnInit } from "@angular/core";
import { LoggerService } from "src/app/services/logger.service";
import { rootVariables } from "../../home.component";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  webPackage = "./src/app/home/viewer/settings/settings.component.ts";

  constructor(private logger: LoggerService) {
    for (const key in rootVariables) {
      document.documentElement.style.setProperty(key, rootVariables[key]);
    }

    this.logger.infoLog({
      className: "SettingsComponent",
      functionName: "constructor",
      description: "Update variables",
      variable: "style",
      value: document.documentElement.style,
    });

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "SettingsComponent",
      functionName: "constructor",
      values: ["Update variables"],
    });
  }

  ngOnInit(): void {}
}

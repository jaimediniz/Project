import { Component, OnInit } from "@angular/core";
import { LoggerService } from "src/app/services/logger.service";
import { rootVariables } from "../../home.component";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  webPackage = "./src/app/home/viewer/settings/settings.component.ts";

  public rootVariables = rootVariables;

  constructor(private logger: LoggerService) {
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

  saveProperties(event): void {
    console.log(event);
    for (const property in event) {
      document.documentElement.style.setProperty(property, event[property]);
    }
  }
}

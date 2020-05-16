import { Component } from "@angular/core";
import { RouteExtensionService } from "./services/route-extension.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "project";
  appRoute = "app";

  constructor(private route: RouteExtensionService) {
    this.route.routeSubject.asObservable().subscribe((routeSubject) => {
      this.appRoute = routeSubject;
    });
  }
}

import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { LoggerService } from "../services/logger.service";
import { RoleGuardService } from "./role-guard.service";
import { NavBarService } from "../services/navbar.service";

@Injectable({
  providedIn: "root",
})
export class NavbarGuardService implements CanActivate {
  webPackage = "./src/app/guards/navbar-guard.service.ts";

  constructor(
    public roleGuard: RoleGuardService,
    public router: Router,
    private logger: LoggerService,
    private navbar: NavBarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // check if is log in, with any role
    //if (!this.roleGuard.checkRole("any")) return false;

    // check if not mobile, change tab to select one and return false
    if (window.innerWidth > 769) {
      this.navbar.emitSelectedTab(route.data.tab);
      return false;
    }

    // if not mobile allow route
    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "NavbarGuardService",
      functionName: "canActivate",
      values: [`Selected route: ${route}`],
    });
    return true;
  }
}

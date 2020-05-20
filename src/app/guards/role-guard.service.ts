import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { decode } from "jwt-decode";
import { LoggerService } from "../services/logger.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuardService implements CanActivate {
  webPackage = "./src/app/guards/role-guard.service.ts";

  roles = {
    none: 0,
    basic: 1,
    admin: 2,
    superAdmin: 3,
  };

  constructor(
    public auth: AuthService,
    public router: Router,
    private logger: LoggerService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole: string = route.data.expectedRole || "any";
    return this.checkRole(this.roles[expectedRole]);
  }

  checkRole(expectedRole: number) {
    if (expectedRole === 0) return true;

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "RoleGuardService",
      functionName: "canActivate",
      values: [`user is authenticated: ${expectedRole}`],
    });

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"]);
      return false;
    }

    const token = localStorage.getItem("token");
    const tokenPayload = decode(token);
    if (tokenPayload.role < expectedRole) {
      this.router.navigate(["home"]);
      return false;
    }

    return true;
  }
}

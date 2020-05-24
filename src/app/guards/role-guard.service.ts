import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import jwtDecode from "jwt-decode";
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
    const expectedRole: number = this.roles[route.data.expectedRole] || 1;
    return this.checkRole(expectedRole);
  }

  checkRole(expectedRole: number): boolean {
    if (expectedRole === 0) return true;

    const isAuthenticated = this.auth.isAuthenticated();

    this.logger.functionLog({
      webPackage: this.webPackage,
      className: "RoleGuardService",
      functionName: "canActivate",
      values: [
        `user is authenticated: ${isAuthenticated}`,
        `user has to be at least level: ${expectedRole}`,
      ],
    });

    if (!isAuthenticated) {
      this.router.navigate(["login"]);
      return false;
    }

    const token = localStorage.getItem("clientToken");
    const tokenPayload = jwtDecode(token);
    if (this.roles[tokenPayload.role] < expectedRole) {
      this.router.navigate(["home"]);
      return false;
    }

    return true;
  }
}

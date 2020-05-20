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
    const expectedRole: number = this.roles[route.data.expectedRole] || 1;
    const { canActivate, newRoute } = this.checkRole(expectedRole);
    this.router.navigate([newRoute]);
    return canActivate;
  }

  checkRole(expectedRole: number): { canActivate: boolean; newRoute: string } {
    if (expectedRole === 0) return { canActivate: true, newRoute: "" };

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
      return { canActivate: false, newRoute: "login" };
    }

    const token = localStorage.getItem("token");
    const tokenPayload = decode(token);
    if (tokenPayload.role < expectedRole) {
      return { canActivate: false, newRoute: "home" };
    }

    return { canActivate: true, newRoute: "" };
  }
}

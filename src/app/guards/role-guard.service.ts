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

  constructor(
    public auth: AuthService,
    public router: Router,
    private logger: LoggerService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole: string = route.data.expectedRole || "any";
    return true; // To-Do
    return this.checkRole(expectedRole);
  }

  checkRole(expectedRole: string) {
    if (expectedRole === "none") return true;

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
    if (tokenPayload.role !== expectedRole) {
      this.router.navigate(["home"]);
      return false;
    }

    return true;
  }
}

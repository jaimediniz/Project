import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { LoggerService } from "../services/logger.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  webPackage = "./src/app/guards/auth-guard.service.ts";

  constructor(
    public auth: AuthService,
    public router: Router,
    private logger: LoggerService
  ) {}

  canActivate(): boolean {
    const isAuthenticated = false; //this.auth.isAuthenticated();

    this.functionLog("AuthGuardService", "canActivate", [
      `user is authenticated: ${isAuthenticated}`,
    ]);

    if (!isAuthenticated) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }

  functionLog(className, functionName, values) {
    this.logger.functionLog({
      webPackage: this.webPackage,
      className,
      functionName,
      values,
    });
  }
}

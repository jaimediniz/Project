import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  webPackage = "./src/app/guards/auth.service.ts";

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
}

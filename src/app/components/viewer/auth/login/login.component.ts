import { Component, OnInit } from "@angular/core";
import { RouteExtensionService } from "src/app/services/route-extension.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "src/app/guards/auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: RouteExtensionService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    // the client has a token & is a valid one
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["home"]);
    }
  }

  ngOnInit(): void {}

  handleLogin() {
    this.http
      .get("http://127.0.0.1:3000/api/v0/login", {
        withCredentials: true,
      })
      .subscribe(
        (resp: { userId: number; role: string; clientToken: string }) => {
          console.log(resp);
          if (!resp.clientToken) return;

          localStorage["clientToken"] = resp.clientToken;
          this.router.navigate(["home"]);
        },
        (errorResp: HttpErrorResponse) => {
          console.log(errorResp);
          console.log(errorResp.error);
        }
      );
  }
}

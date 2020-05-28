import { Component, OnInit } from "@angular/core";
import { RouteExtensionService } from "src/app/services/route-extension.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "src/app/guards/auth.service";
import { BackendService } from "src/app/services/backend.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: RouteExtensionService,
    private http: HttpClient,
    private authService: AuthService,
    private backendService: BackendService
  ) {
    // the client has a token & is a valid one
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["home"]);
    }
  }

  ngOnInit(): void {}

  handleLogin() {
    this.http
      .get(this.backendService.backendEndPoints("login"), {
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

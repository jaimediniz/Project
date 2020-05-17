import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // the client has a token & is a valid one
    if (localStorage["clientToken"]) {
      // redirect to home
    }

    // generate token
    let clientToken;
    localStorage["clientToken"] = clientToken;
  }
}

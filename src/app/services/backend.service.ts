import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  origin: string = "http://127.0.0.1:3000";

  backendEndPoints(endPoint: string) {
    return `${this.ENDPOINTS[endPoint]}`;
  }

  ENDPOINTS = {
    login: `${this.origin}/api/v0/login`,
  };
}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserInfoComponent } from "./home/viewer/user-info/user-info.component";
import { CalendarComponent } from "./home/viewer/calendar/calendar.component";
import { HomeViewerComponent } from "./home/viewer/home-viewer/home-viewer.component";
import { SettingsComponent } from "./home/viewer/settings/settings.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

const routes: Routes = [
  // Auth
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  // App
  { path: "home", component: HomeViewerComponent },
  { path: "contacts/:id", component: UserInfoComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "settings", component: SettingsComponent },
  // Error handlers
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

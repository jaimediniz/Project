import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserInfoComponent } from "./components/home/viewer/user-info/user-info.component";
import { CalendarComponent } from "./components/home/viewer/calendar/calendar.component";
import { HomeViewerComponent } from "./components/home/viewer/home-viewer/home-viewer.component";
import { SettingsComponent } from "./components/home/viewer/settings/settings.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { AuthGuardService as AuthGuard } from "./guards/auth-guard.service";

const routes: Routes = [
  // Auth
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  // App
  { path: "home", component: HomeViewerComponent, canActivate: [AuthGuard] },
  {
    path: "contacts/:id",
    component: UserInfoComponent,
    canActivate: [AuthGuard],
  },
  { path: "calendar", component: CalendarComponent, canActivate: [AuthGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
  // Error handlers
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

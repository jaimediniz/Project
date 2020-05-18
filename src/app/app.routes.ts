import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserInfoComponent } from "./components/viewer/user-info/user-info.component";
import { CalendarComponent } from "./components/viewer/calendar/calendar.component";
import { HomeViewerComponent } from "./components/viewer/home-viewer/home-viewer.component";
import { SettingsComponent } from "./components/viewer/settings/settings.component";
import { LoginComponent } from "./components/viewer/auth/login/login.component";
import { RegisterComponent } from "./components/viewer/auth/register/register.component";
import { RoleGuardService as RoleGuard } from "./guards/role-guard.service";

const routes: Routes = [
  // Auth
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  // App
  {
    path: "home",
    component: HomeViewerComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: "none",
    },
  },
  {
    path: "contacts/:id",
    component: UserInfoComponent,
    canActivate: [RoleGuard],
  },
  { path: "calendar", component: CalendarComponent, canActivate: [RoleGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [RoleGuard] },
  // Error handlers
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

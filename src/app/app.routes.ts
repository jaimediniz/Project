import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserInfoComponent } from "./components/home/viewer/user-info/user-info.component";
import { CalendarComponent } from "./components/home/viewer/calendar/calendar.component";
import { HomeViewerComponent } from "./components/home/viewer/home-viewer/home-viewer.component";
import { SettingsComponent } from "./components/home/viewer/settings/settings.component";
import { LoginComponent } from "./components/home/viewer/auth/login/login.component";
import { RegisterComponent } from "./components/home/viewer/auth/register/register.component";
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

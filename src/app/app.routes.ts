import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserInfoComponent } from "./components/viewer/user-info/user-info.component";
import { CalendarComponent } from "./components/viewer/calendar/calendar.component";
import { HomeViewerComponent } from "./components/viewer/home-viewer/home-viewer.component";
import { SettingsComponent } from "./components/viewer/settings/settings.component";
import { LoginComponent } from "./components/viewer/auth/login/login.component";
import { RegisterComponent } from "./components/viewer/auth/register/register.component";
import { RoleGuardService as RoleGuard } from "./guards/role-guard.service";
import { ContactsComponent } from "./components/drawer/contacts/contacts.component";
import { InvitesComponent } from "./components/drawer/invites/invites.component";
import { NavbarGuardService } from "./guards/navbar-guard.service";
import { GroupsComponent } from "./components/drawer/groups/groups.component";

const routes: Routes = [
  // Auth
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  // Navbar
  {
    path: "contacts",
    children: [
      {
        path: "",
        component: ContactsComponent,
        canActivate: [NavbarGuardService],
        data: {
          tab: 0,
        },
      },
      {
        path: ":id",
        component: UserInfoComponent,
        canActivate: [RoleGuard],
      },
      { path: "**", redirectTo: "/contacts" },
    ],
  },
  {
    path: "groups",
    children: [
      {
        path: "",
        component: GroupsComponent,
        canActivate: [NavbarGuardService],
        data: {
          tab: 1,
        },
      },
      {
        path: ":id",
        component: UserInfoComponent,
        canActivate: [RoleGuard],
      },
      { path: "**", redirectTo: "/groups" },
    ],
  },
  {
    path: "invites",
    children: [
      {
        path: "",
        component: InvitesComponent,
        canActivate: [NavbarGuardService],
        data: {
          tab: 2,
        },
      },
      {
        path: ":id",
        component: UserInfoComponent,
        canActivate: [RoleGuard],
      },
      { path: "**", redirectTo: "/invites" },
    ],
  },
  // Content
  {
    path: "home",
    component: HomeViewerComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: "none",
    },
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

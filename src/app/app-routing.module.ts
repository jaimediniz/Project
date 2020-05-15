import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserInfoComponent } from "./home/viewer/user-info/user-info.component";
import { CalendarComponent } from "./home/viewer/calendar/calendar.component";
import { HomeViewerComponent } from "./home/viewer/home-viewer/home-viewer.component";
import { SettingsComponent } from "./home/viewer/settings/settings.component";
import { InvitesComponent } from "./home/drawer/invites/invites.component";

const routes: Routes = [
  { path: "home", component: HomeViewerComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "userInfo/:id", component: UserInfoComponent },
  { path: "inviteInfo/:id", component: InvitesComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "settings", component: SettingsComponent },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

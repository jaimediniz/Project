import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserInfoComponent } from "./home/viewer/user-info/user-info.component";
import { CalendarComponent } from "./home/viewer/calendar/calendar.component";

const routes: Routes = [
  { path: "home", component: UserInfoComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "userInfo", component: UserInfoComponent },
  { path: "userInfo/:id", component: UserInfoComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserInfoComponent } from './home/viewer/user-info/user-info.component';

const routes: Routes = [
  { path: "home", component: UserInfoComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "userInfo", component: UserInfoComponent },
  { path: "userInfo/:id", component: UserInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

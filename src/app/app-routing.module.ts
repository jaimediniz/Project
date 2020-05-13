import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InvitesComponent } from "./home/drawer/invites/invites.component";

const routes: Routes = [
  { path: "home", component: InvitesComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "chat", component: InvitesComponent },
  { path: 'chat', loadChildren: () => import('./routes/chat/chat.module').then(m => m.ChatModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

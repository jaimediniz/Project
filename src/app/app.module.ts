import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactsComponent } from "./home/drawer/contacts/contacts.component";
import { InvitesComponent } from "./home/drawer/invites/invites.component";
import { DrawerComponent } from "./home/drawer/drawer.component";
import { ViewerComponent } from "./home/viewer/viewer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { HomeComponent } from "./home/home.component";
import { UserInfoComponent } from "./home/viewer/user-info/user-info.component";
import { CreateInviteComponent } from "./home/viewer/create-invite/create-invite.component";
import { NgxMaskModule, IConfig } from "ngx-mask";

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    InvitesComponent,
    DrawerComponent,
    ViewerComponent,
    HomeComponent,
    UserInfoComponent,
    CreateInviteComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(options),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

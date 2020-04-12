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

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    InvitesComponent,
    DrawerComponent,
    ViewerComponent,
    HomeComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

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
import { SideBarComponent } from "./home/drawer/side-bar/side-bar.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { CalendarComponent } from "./home/viewer/calendar/calendar.component";

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
    SideBarComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(options),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { IConfig, NgxMaskModule } from "ngx-mask";

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { ContactsComponent } from "./components/drawer/contacts/contacts.component";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { InvitesComponent } from "./components/drawer/invites/invites.component";
import { MainComponent } from "./components/main.component";
import { CalendarComponent } from "./components/viewer/calendar/calendar.component";
import { CreateInviteComponent } from "./components/viewer/create-invite/create-invite.component";
import { UserInfoComponent } from "./components/viewer/user-info/user-info.component";
import { ViewerComponent } from "./components/viewer/viewer.component";
import { MaterialModule } from "./material.module";
import { SettingsComponent } from "./components/viewer/settings/settings.component";
import { Viewer2Component } from "./components/viewer2/viewer2.component";
import { LoginComponent } from "./components/viewer/auth/login/login.component";
import { RegisterComponent } from "./components/viewer/auth/register/register.component";

import { AngularResizedEventModule } from "angular-resize-event";
export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    InvitesComponent,
    DrawerComponent,
    ViewerComponent,
    MainComponent,
    UserInfoComponent,
    CreateInviteComponent,
    CalendarComponent,
    SettingsComponent,
    Viewer2Component,
    LoginComponent,
    RegisterComponent,
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
    AngularResizedEventModule,
  ],
  exports: [AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

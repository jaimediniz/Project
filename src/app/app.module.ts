import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { IConfig, NgxMaskModule } from "ngx-mask";

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Routes } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactsComponent } from "./components/home/drawer/contacts/contacts.component";
import { DrawerComponent } from "./components/home/drawer/drawer.component";
import { InvitesComponent } from "./components/home/drawer/invites/invites.component";
import { HomeComponent } from "./components/home/home.component";
import { CalendarComponent } from "./components/home/viewer/calendar/calendar.component";
import { CreateInviteComponent } from "./components/home/viewer/create-invite/create-invite.component";
import { UserInfoComponent } from "./components/home/viewer/user-info/user-info.component";
import { ViewerComponent } from "./components/home/viewer/viewer.component";
import { MaterialModule } from "./material.module";
import { SettingsComponent } from "./components/home/viewer/settings/settings.component";
import { Viewer2Component } from "./components/home/viewer2/viewer2.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { AuthComponent } from "./components/auth/auth.component";

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
    CalendarComponent,
    SettingsComponent,
    Viewer2Component,
    AuthComponent,
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
  ],
  exports: [AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

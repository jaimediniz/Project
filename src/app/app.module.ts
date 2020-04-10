import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponentComponent } from './home/drawer/contacts/contacts-component/contacts-component.component';
import { ContactsComponent } from './home/drawer/contacts/contacts.component';
import { InvitesComponent } from './home/drawer/invites/invites.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponentComponent,
    ContactsComponent,
    InvitesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIconsModule } from '@ng-icons/core';
import { NgxMaskModule } from 'ngx-mask';
import { bootstrapPencil, bootstrapTrash } from '@ng-icons/bootstrap-icons';

import { AddContactComponent } from './components/add-contact/add-contact.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ViewContactComponent,
    ContactListComponent,
    EditContactComponent,
    AddContactComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgIconsModule.withIcons({
      bootstrapPencil,
      bootstrapTrash
    }),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

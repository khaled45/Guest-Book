import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './View/home/home.component';
import { LoginComponent } from './View/login/login.component';
import { SignupComponent } from './View/signup/signup.component';
import { MessagesComponent } from './View/messages/messages.component';
import { NavbarComponent } from './View/navbar/navbar.component';
import { NotfoundComponent } from './View/notfound/notfound.component';
import { MessageDetailsComponent } from './View/message-details/message-details.component';
import { ReactiveFormsModule } from "@angular/forms";
import { GeustService } from "./Services/geust.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { MessageCardComponent } from './View/message-card/message-card.component';
import { TokenEnterceptorService } from './Services/token-enterceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    MessagesComponent,
    NavbarComponent,
    NotfoundComponent,
    MessageDetailsComponent,
    MessageCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [GeustService, CookieService, { provide: HTTP_INTERCEPTORS, useClass: TokenEnterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

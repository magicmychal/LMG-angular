import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {TooltipModule} from "ngx-bootstrap";
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthenticationService} from "./_services";
import { GetComponent } from './test/get/get.component';
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {fakeBackendProvider} from "./_helpers/fake-backend";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    GetComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

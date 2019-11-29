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
import { PointsDashboardComponent } from './points/points-dashboard/points-dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from "angular-bootstrap-md";
import { PointsAddComponent } from './points/points-add/points-add.component';
import { MapSearchComponent } from './maps/map-search/map-search.component';
import { HereMapComponent } from './maps/here-map/here-map.component';
import { FormNavButtonsComponent } from './addons/form-nav-buttons/form-nav-buttons.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {SearchService} from "./_services/map/search.service";
import { RoutesDashboardComponent } from './routes/routes-dashboard/routes-dashboard.component';
import { RoutesAddComponent } from './routes/routes-add/routes-add.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MapImageComponent } from './maps/map-image/map-image.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    GetComponent,
    HomeComponent,
    PointsDashboardComponent,
    PointsAddComponent,
    MapSearchComponent,
    HereMapComponent,
    FormNavButtonsComponent,
    RoutesDashboardComponent,
    RoutesAddComponent,
    MapImageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //TODO: Remove fake backend provider
    fakeBackendProvider,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

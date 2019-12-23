import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {TooltipModule} from "ngx-bootstrap";
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GetComponent} from './test/get/get.component';
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {fakeBackendProvider} from "./_helpers/fake-backend";
import {HomeComponent} from './home/home.component';
import {PointsDashboardComponent} from './points/points-dashboard/points-dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {PointsAddComponent} from './points/points-add/points-add.component';
import {MapSearchComponent} from './maps/map-search/map-search.component';
import {HereMapComponent} from './maps/here-map/here-map.component';
import {FormNavButtonsComponent} from './addons/form-nav-buttons/form-nav-buttons.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {SearchService} from "./_services/map/search.service";
import {RoutesDashboardComponent} from './roads/roads-dashboard/routes-dashboard.component';
import {RoutesAddComponent} from './roads/roads-add/routes-add.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MapImageComponent} from './maps/map-image/map-image.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormlyModule} from "@ngx-formly/core";
import {FormlyMaterialModule} from "@ngx-formly/material";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSpinnerOverlayComponent} from './addons/mat-spinner-overlay/mat-spinner-overlay.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MapmodalComponent} from './addons/mapmodal/mapmodal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { RoadsEditComponent } from './roads/roads-edit/roads-edit.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from "@angular/material/expansion";

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
    MatSpinnerOverlayComponent,
    MapmodalComponent,
    RoadsEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MatSidenavModule,
    MatAutocompleteModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    DragDropModule,
    MatDividerModule,
    MatExpansionModule
  ],
  entryComponents: [
    MapmodalComponent
  ],
  providers: [

    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    //TODO: Remove fake backend provider
    fakeBackendProvider,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

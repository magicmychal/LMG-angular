import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {PointsDashboardComponent} from "./points/points-dashboard/points-dashboard.component";
import {PointsAddComponent} from "./points/points-add/points-add.component";
import {RoutesDashboardComponent} from "./roads/roads-dashboard/routes-dashboard.component";
import {RoutesAddComponent} from "./roads/roads-add/routes-add.component";
import {MapSearchComponent} from "./maps/map-search/map-search.component";
import {RoadsEditComponent} from "./roads/roads-edit/roads-edit.component";
import {PointsSelectorComponent} from "./addons/points-selector/points-selector.component";


const routes: Routes = [
  {
    path: '**',
    redirectTo: 'app'
  },
  {
    path: 'nav',
    component: NavbarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'points',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: PointsDashboardComponent},
      {path: 'add', component: PointsAddComponent},
      {path: 'edit/:id', component: PointsAddComponent}
    ]
  },
  {
    path: 'roads',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: RoutesDashboardComponent},
      {path: 'add', component: RoutesAddComponent},
      {path: 'edit/:id', component: RoadsEditComponent}
    ]
  },
  {
    path: 'map',
    component: MapSearchComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'select',
    component: PointsSelectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

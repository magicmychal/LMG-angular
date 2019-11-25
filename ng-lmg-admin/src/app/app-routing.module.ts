import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {PointsDashboardComponent} from "./points/points-dashboard/points-dashboard.component";
import {PointsAddComponent} from "./points/points-add/points-add.component";
import {RoutesDashboardComponent} from "./routes/routes-dashboard/routes-dashboard.component";
import {RoutesAddComponent} from "./routes/routes-add/routes-add.component";


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
      {path: 'add', component: PointsAddComponent}
    ]
  },
  {
    path: 'routes',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: RoutesDashboardComponent},
      {path: 'add', component: RoutesAddComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

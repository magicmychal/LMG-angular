import { Component } from '@angular/core';
import {AuthenticationService} from "./_services";
import {Router} from "@angular/router";
import {User} from "./_models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthenticationService]
})
export class AppComponent {
  title = 'ng-lmg-admin';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
}

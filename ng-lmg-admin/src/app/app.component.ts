import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./_services";
import {Router} from "@angular/router";
import {User} from "./_models/user";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit {
  title = 'ng-lmg-admin';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private titleService: Title
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.titleService.setTitle("Let Me Guide");
  }
}

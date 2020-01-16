import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "./_services";
import {Router} from "@angular/router";
import {User} from "./_models/user";
import {Title} from "@angular/platform-browser";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit {
  title: string = 'Let Me Guide';
  currentUser: User;

  showMobileNavBar: boolean = false;
  showSideNavBar: boolean = true;
  sideNavBarMode: string = 'side'


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private titleService: Title,
    private breakpointObserver: BreakpointObserver
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
    ]).subscribe(result => {
      if (result.matches) {
        this.toggleMobile(result.matches);
      } else {
        this.toggleMobile(result.matches)
      }
    });

  }

  ngOnInit(): void {
    this.titleService.setTitle("Let Me Guide");
  }

  toggleMobile(mobile: boolean) {
    this.showMobileNavBar = mobile == true ? true : false;
    this.showSideNavBar = mobile == true ? false : true;
    this.sideNavBarMode = mobile == true ? "push" : "side";
  }
}

import { Component } from '@angular/core';
import {AuthenticationService} from "./_services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthenticationService]
})
export class AppComponent {
  title = 'ng-lmg-admin';
}

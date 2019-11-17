import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-points-dashboard',
  templateUrl: './points-dashboard.component.html',
  styleUrls: ['./points-dashboard.component.scss']
})
export class PointsDashboardComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Your Points");
  }

}

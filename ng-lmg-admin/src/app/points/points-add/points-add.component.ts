import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-points-add',
  templateUrl: './points-add.component.html',
  styleUrls: ['./points-add.component.scss']
})
export class PointsAddComponent implements OnInit {

  public query: string;

  constructor() {
    this.query = "Krakow";
  }

  ngOnInit() {
  }

}

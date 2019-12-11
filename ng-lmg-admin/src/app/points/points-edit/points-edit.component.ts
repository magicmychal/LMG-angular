import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-points-edit',
  templateUrl: './points-edit.component.html',
  styleUrls: ['./points-edit.component.scss']
})
export class PointsEditComponent implements OnInit {

  let

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => console.log(params))
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { NewtableDataSource, NewtableItem } from './newtable-datasource';
import {PointsService} from "../../../_services/points/points.service";

@Component({
  selector: 'app-newtable',
  templateUrl: './newtable.component.html',
  styleUrls: ['./newtable.component.scss']
})
export class NewtableComponent implements AfterViewInit, OnInit {
  dataSource: any;
  columnsToDisplay = ['name', 'description', 'code'];
  dataSource2: any;

  constructor(private pointsService:PointsService){}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.pointsService.getPoints()
      .subscribe(
        results => {
          this.dataSource = results;
          console.log(results);
          this.dataSource2 = new MatTableDataSource(this.dataSource);
          this.dataSource2.paginator = this.paginator;
        },
        error => {console.error(error)},
      )
  }

  ngAfterViewInit() {

  }
}

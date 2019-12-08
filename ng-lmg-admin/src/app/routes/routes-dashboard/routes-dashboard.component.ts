import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {RoutesService} from "../../_services/routes/routes.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-routes-dashboard',
  templateUrl: './routes-dashboard.component.html',
  styleUrls: ['./routes-dashboard.component.scss']
})
export class RoutesDashboardComponent implements OnInit {

  materialSpinner = false;

  // variables for the table
  roads: any;
  columnsToDisplay = ['name', 'location', 'decoy', 'action'];
  dataSource: any;

  // paginator for the material table
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private titleService: Title,
    private roadService: RoutesService,
    private _snackBar: MatSnackBar,
  ) {
  }


  ngOnInit() {
    this.titleService.setTitle("Your Roads");

    // get points, initiate map
    this.materialSpinner = true;
    this.roadService.getRoads()
      .subscribe(
        results => {
            this.roads = results;
            this.dataSource = new MatTableDataSource(this.roads);
            this.dataSource.paginator = this.paginator;
            this.materialSpinner = false;
        },
        error => console.log(error)
      )
  }


}

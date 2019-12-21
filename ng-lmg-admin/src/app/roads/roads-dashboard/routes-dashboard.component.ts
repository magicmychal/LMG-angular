import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {RoadService} from "../../_services/roads/road.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MapmodalComponent} from "../../addons/mapmodal/mapmodal.component";
import {MatDialog} from "@angular/material/dialog";

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
    private roadService: RoadService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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
        error => {
          this.materialSpinner = false;
          console.error('the error is', error)
          let errorSnackbar = this._snackBar.open("An error occur, please reload the page", "Reload", {
            duration: 60000,
          });
          errorSnackbar.afterDismissed().subscribe(null, null, () => {
            window.location.reload();
          })
        }
      )
  }

  openMapDialog(location){
    // set the geolocation
    let lat = location.latitude
    let lng = location.longitude
    console.log(location)
    const dialogRef = this.dialog.open(MapmodalComponent, {
      data: {
        lat: lat,
        lng: lng
      }
    });
  }


}

import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {RoadService} from "../../_services/roads/road.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MapmodalComponent} from "../../addons/mapmodal/mapmodal.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-routes-dashboard',
  templateUrl: './routes-dashboard.component.html',
  styleUrls: ['./routes-dashboard.component.scss']
})
export class RoutesDashboardComponent implements OnInit {

  materialSpinner = false;

  // variables for the table
  roads: any;
  columnsToDisplay = ['name', 'location', 'decoy', 'rating', 'action', 'is_published'];
  dataSource: any;

  // paginator for the material table
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
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
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
              case 'location.name': return item.location.name;
              case 'is_published': return item.published
              default: return item[property];
            }
          };
          this.dataSource.filterPredicate = (data, filter) => {
            const dataStr = data.name + data.decoy + data.location.name;
            return dataStr.indexOf(filter) != -1;
          }
        },
        error => {
          this.materialSpinner = false;
          console.error('the error is', error);
          let errorSnackbar = this._snackBar.open("An error occur, please reload the page", "Reload", {
            duration: 60000,
          });
          errorSnackbar.afterDismissed().subscribe(null, null, () => {
            window.location.reload();
          })
        }
      )
  }

  openMapDialog(location) {
    // set the geolocation
    let lat = location.latitude;
    let lng = location.longitude;
    console.log(location);
    const dialogRef = this.dialog.open(MapmodalComponent, {
      data: {
        lat: lat,
        lng: lng
      }
    });
  }

  filterTable(filterValue: string){
    this.dataSource.filter = filterValue;
  }
}

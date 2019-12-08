// https://mdbootstrap.com/docs/angular/tables/basic/
import {Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {PointsService} from "../../_services/points/points.service";
// table
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-points-dashboard',
  templateUrl: './points-dashboard.component.html',
  styleUrls: ['./points-dashboard.component.scss']
})
export class PointsDashboardComponent implements OnInit, AfterViewInit {
   searchText: string = '';

  // for the material table
  points: any;
  columnsToDisplay = ['name', 'location', 'description', 'action'];
  dataSource: any;

  materialSpinner = false;

  // paginator for the material table
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private titleService: Title,
    private cdRef: ChangeDetectorRef,
    private pointsService: PointsService,
    private _snackBar: MatSnackBar
  ) {
  }



  ngOnInit() {
    this.titleService.setTitle("Your Points");
    this.materialSpinner = true;
    // for the material table
    this.pointsService.getPoints()
      .subscribe(
        results => {
          this.points = results;
          console.log(results);
          this.dataSource = new MatTableDataSource(this.points);
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
        },
      );

  }

  ngAfterViewInit() {
  }

}

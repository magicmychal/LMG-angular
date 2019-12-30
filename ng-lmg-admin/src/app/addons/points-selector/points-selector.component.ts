import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {PointsService} from "../../_services/points/points.service";


@Component({
  selector: 'app-points-selector',
  templateUrl: './points-selector.component.html',
  styleUrls: ['./points-selector.component.scss']
})
export class PointsSelectorComponent implements OnInit {
  points: any;
  columnsToDisplay = ['select', 'name', 'description', 'code'];
  dataSource: any;

  // for the selection
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel(this.allowMultiSelect, this.initialSelection);
  isLinear = true;

  /*
  Selection is the type of set, which is hard to operate on.
  Converting it to array will simplify further operations
   */
  selectedArray: object = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @Input() public passedSelectedPoints: any;

  // spinner
  spinner = false;

  constructor(
    private pointsService: PointsService
  ) {
  }

  ngOnInit() {

    this.spinner = true;

    this.pointsService.getPoints()
      .subscribe(
        results => {
          this.points = results;
          console.log(results);
          this.dataSource = new MatTableDataSource(this.points);
          this.dataSource.paginator = this.paginator;

          if (this.passedSelectedPoints) {
            this.checkSelected()
          } else {
            this.spinner = false;
          }

        },
        error => {
          console.error(error);
          this.spinner = false;
        },
      );

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
    console.log('selected')
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkSelected() {

    console.log('data source', this.dataSource._data._value);
    this.dataSource._data._value.shift();


    // convert this.passedSelectedPoints to a structure that's this.points-alike
    let newSelectedPointsArray = [];
    for (let point of this.passedSelectedPoints) {
      let query = {
        "id": point['point']['id'],
        "name": point['point']['name'],
        "description": point['point']['description'],
        "code": point['point']['code'],
        "location": {
          "id": point['point']['location']['id'],
          "latitude": point['point']['location']['latitude'],
          "longitude": point['point']['location']['longitude'],
          "name": point['point']['location']['name']
        }
      };
      console.log(this.dataSource._data._value.indexOf(query))

      /*// loop through data source array to find matches to remove
      for (let index in this.dataSource._data._value) {
        console.log(' compare ', this.dataSource._data._value[index], ' to ', query)
        if (this.dataSource[index] == query) {
          console.log('its a match!')
        }
      }*/
    }


    // bledne odniesienie tutaj
    for (let point of this.points) {

      this.selection.select(point)
      //this.selection['_selection'].add(point)
    }


    this.spinner = false;
  }


}

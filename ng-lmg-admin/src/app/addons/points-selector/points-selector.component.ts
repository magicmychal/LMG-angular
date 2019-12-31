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

    let newSelection = []
    for (let point of this.passedSelectedPoints){
      let targetId = point['point']['id']
      // look for that point in the array
      for (let index in this.dataSource._data._value){
        if(this.dataSource._data._value[index]['id'] == targetId ){
         //this.dataSource._data._value = this.dataSource._data._value.splice(Number(index), 1)
          newSelection = this.dataSource._data._value.splice(Number(index), 1)
        }
      }
    }
    console.log(newSelection)






    this.spinner = false;
  }


}

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {PointsService} from "../../_services/points/points.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-routes-add',
  templateUrl: './routes-add.component.html',
  styleUrls: ['./routes-add.component.scss']
})
export class RoutesAddComponent implements OnInit, OnDestroy {
  // for the stepper
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;
  pointsFormGroup: FormGroup;
  pointFormGroup: FormGroup;

  // for the table
  points: any;
  columnsToDisplay = ['select', 'name', 'description', 'code'];
  dataSource: any;

  // for the selection
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel(this.allowMultiSelect, this.initialSelection);

  /*
  Selection is the type of set, which is hard to operate on.
  Converting it to array will simplify further operations
   */
  selectedArray: object = [];

  // for the local storage
  pointsDetails: object = [];


  constructor(
  private _formBuilder: FormBuilder,
  private pointsService:PointsService
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    // TODO: check if array exist and ask to continue the last


    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]]
    });
    this.pointsFormGroup = this._formBuilder.group({
      points: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.lastFormGroup = this._formBuilder.group({
    });
    this.pointFormGroup = this._formBuilder.group({
      sightseeing: ['', [Validators.required, Validators.maxLength(250)]],
      challenge: ['', [Validators.required, Validators.maxLength(250)]],
    });

    this.pointsService.getPoints()
      .subscribe(
        results => {
          this.points = results;
          console.log(results);
          this.dataSource = new MatTableDataSource(this.points);
          this.dataSource.paginator = this.paginator;
        },
        error => {console.error(error)},
      );
  }

  ngOnDestroy() {
    localStorage.removeItem('currentPoints')
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  convertSelected(){
    // @ts-ignore
    this.selectedArray = Array.from(this.selection._selection);
    console.log('array is ', this.selectedArray)
  }

  onNextClick(position, name){
    console.log('position to check, ', position);
    // gather variables
    let challengeDescription = this.pointFormGroup.controls.challenge.value;
    let sightseeingDescription = this.pointFormGroup.controls.sightseeing.value;
    console.log(this.pointFormGroup.controls.challenge.value);
    let point = {
      "name": name,
      "challenge": challengeDescription,
      "sightseeing": sightseeingDescription
    }
    // check if the position exists
    if(this.pointsDetails[position]){
      console.log('istnieje')
      this.pointsDetails[position] = point;
    } else {
      // add to array
      this.pointsDetails.push(point);
    }
    localStorage.setItem('currentPoints', JSON.stringify(this.pointsDetails))
    console.log('our array', this.pointsDetails)
    // clear the form
    this.pointFormGroup.controls.challenge.setValue(' ');
    this.pointFormGroup.controls.sightseeing.setValue(' ');
  }

  onBackClick(){

  }
}

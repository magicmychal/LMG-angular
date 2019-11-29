import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;
  pointsFormGroup: FormGroup;

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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // dynamic form testing
  dynamicForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private pointsService: PointsService,
  ) {
  }

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
    this.lastFormGroup = this._formBuilder.group({});
    this.dynamicForm = this._formBuilder.group({
      points: new FormArray([])
    });

    this.pointsService.getPoints()
      .subscribe(
        results => {
          this.points = results;
          console.log(results);
          this.dataSource = new MatTableDataSource(this.points);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.error(error)
        },
      );
  }

  ngOnDestroy() {
    localStorage.removeItem('currentPoints')
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.points as FormArray; }

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

  initiatePoints() {
    // convert selected to the array
    // @ts-ignore
    this.selectedArray = Array.from(this.selection._selection);
    console.log('array is ', this.selectedArray)

    this.dynamicForm.reset();
    this.t.clear();

    for (let repeat in this.selectedArray){
      this.t.push(this._formBuilder.group({
        sightseeing: ['', Validators.required],
        challenge: ['', Validators.required]
      }));
    }
  }

  onNextClick(position, name, id) {

  }

}

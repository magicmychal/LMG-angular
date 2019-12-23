import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {PointsService} from "../../_services/points/points.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {RoadService} from "../../_services/roads/road.service";
import {MapViewService} from "../../_services/map/map-view.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatStepper} from "@angular/material/stepper";


@Component({
  selector: 'app-routes-add',
  templateUrl: './routes-add.component.html',
  styleUrls: ['./routes-add.component.scss']
})
export class RoutesAddComponent implements OnInit, AfterViewInit, OnDestroy {

  // for the table
  points: any;
  columnsToDisplay = ['select', 'name', 'description', 'code'];
  dataSource: any;

  // for the selection
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel(this.allowMultiSelect, this.initialSelection);
  isLinear = true;


  // for the leaf map
  leafMap: any;
  leafMarker: any;
  /*
  Selection is the type of set, which is hard to operate on.
  Converting it to array will simplify further operations
   */
  selectedArray: object = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dynamicForm: FormGroup;
  // spinner
  spinner = false;
  // for editing
  roadId: string;
  roadLocationName: any;

  private L: any;
  @ViewChild('stepper', {static: false}) private mainStepper: MatStepper;

  constructor(
    private _formBuilder: FormBuilder,
    private pointsService: PointsService,
    private roadService: RoadService,
    private mapViewService: MapViewService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {
  }

  // convenience getters for easy access to form fields
  get f() {
    return this.dynamicForm.controls;
  }

  get pointsArray() {
    return this.f.points as FormArray;
  }

  ngOnInit() {
    this.dynamicForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      decoy: ['', [Validators.required, Validators.maxLength(250)]],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      locName: ['', [Validators.required, Validators.maxLength(250)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
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



  ngAfterViewInit() {
    this.leafMap = this.mapViewService.setLeafMap();
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

  initiatePoints() {
    // convert selected to the array
    // @ts-ignore
    this.selectedArray = Array.from(this.selection._selection);
    console.log('array is ', this.selectedArray);

    // @ts-ignore
    if (this.selectedArray.length == 0) {
      console.log('0');
      this.mainStepper.previous();
      this._snackbar.open('Select points', 'Dismiss', {
        duration: 3500
      });
    }

    this.isLinear = false;


    // this.dynamicForm.reset();
    this.pointsArray.clear();

    // @ts-ignore
    for (let point of this.selectedArray) {
      let pointId = point.id;
      this.pointsArray.push(this._formBuilder.group({
        pointId: [pointId],
        sightseeing: ['', Validators.required],
        challenge: ['', Validators.required]
      }));
    }

    console.log('the forms is', this.pointsArray)
  }

  initiateEditPoints() {
    console.log('array is ', this.selectedArray);

    // @ts-ignore
    if (this.selectedArray.length == 0) {
      console.log('0');
      this.mainStepper.previous();
      this._snackbar.open('Select points', 'Dismiss', {
        duration: 3500
      });
    }

    this.isLinear = false;

    // @ts-ignore
    for (let point of this.selectedArray) {
      let pointId = point.id;
      console.log('point is', point)
      this.pointsArray.push(this._formBuilder.group({
        pointId: [pointId],
        sightseeing: ['', Validators.required],
        challenge: ['', Validators.required]
      }));
    }

    console.log('the forms is', this.pointsArray)
  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      this._snackbar.open('Form invalid. Check the form for any mistakes', 'Dismiss', {
        duration: 3500
      });
      return;
    } else {
      this.spinner = true;
      //this.roadService.addNewRoute(this.f) == true ? this.onSuccessSubmit() : this.onFailSubmit()
      this.roadService.addNewRoute(this.f)
        .subscribe(results => {
            let roadId = results['id'];
            this.onSuccessSubmit(roadId);
          },
          error => {
            this.onFailSubmit();
          })
    }
  }

  onSuccessSubmit(roadId) {
    this._snackbar.open('Road added, you can now edit the details', 'Dismiss', {
      duration: 3500
    });
    let returnUrl = '/roads/edit/'+roadId
    this.router.navigate([returnUrl]);
  }

  onFailSubmit() {
    this.spinner = false;
    console.log('error');
    this._snackbar.open('Error submitting the form, check the fields and try again.', 'Dismiss', {
      duration: 3500
    });
    // give user feedback
  }

  onResultClick(position) {
    // set the map in the right position and show the marker

    this.f.lat.setValue(position[0]);
    this.f.lng.setValue(position[1]);
    this.f.locName.setValue(position[2]);

    if (this.leafMarker) {
      this.leafMarker.remove();
    }
    // @ts-ignore
    this.leafMap.setView(L.latLng(position[0], position[1]), 10);
    // @ts-ignore
    this.leafMarker = L.marker([position[0], position[1]]).addTo(this.leafMap);

  }


}

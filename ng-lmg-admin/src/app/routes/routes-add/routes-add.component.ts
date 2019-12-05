import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {PointsService} from "../../_services/points/points.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {RoutesService} from "../../_services/routes/routes.service";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {MapViewService} from "../../_services/map/map-view.service";


@Component({
  selector: 'app-routes-add',
  templateUrl: './routes-add.component.html',
  styleUrls: ['./routes-add.component.scss']
})
export class RoutesAddComponent implements OnInit, AfterViewInit ,OnDestroy {

  // for the table
  points: any;
  columnsToDisplay = ['select', 'name', 'description', 'code'];
  dataSource: any;

  // for the selection
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel(this.allowMultiSelect, this.initialSelection);

  // for the leaf map
  leafMap: any;
  leafMarker: any;
  private L: any;

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
    private routeService: RoutesService,
    private mapViewService: MapViewService
  ) {
  }

  ngOnInit() {
    // TODO: check if array exist and ask to continue the last


    this.dynamicForm = this._formBuilder.group({
      name: ['', Validators.required],
      decoy: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      locName: ['', Validators.required],
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

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get pointsArray() { return this.f.points as FormArray; }

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

   // this.dynamicForm.reset();
   this.pointsArray.clear();

    // @ts-ignore
    for (let point of this.selectedArray){
      let pointId = point.id
      this.pointsArray.push(this._formBuilder.group({
        pointId: [pointId],
        sightseeing: [''],
        challenge: ['']
      }));
    }

    console.log('the forms is', this.pointsArray)
  }

  onSubmit(){
  console.log('submited', this.f)
    this.routeService.addNewRoute(this.f)

  }
  onNextClick(position, name, id) {

  }

  testClick(){
    console.log('this is what came from it,', this.dynamicForm)
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
    this.leafMap.setView(L.latLng(position[0], position[1]), 10)
    // @ts-ignore
    this.leafMarker= L.marker([position[0], position[1]]).addTo(this.leafMap);

  }

}

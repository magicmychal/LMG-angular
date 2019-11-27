import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {PointsService} from "../../_services/points/points.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {environment} from "@environments/environment";
import {kebabToCamelCase} from "codelyzer/util/utils";
import {SearchService} from "../../_services/map/search.service";

declare var H: any;

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

  // for the map
  // @ts-ignore
  @ViewChild("map")
  public mapElement: ElementRef;
  private platform: any;
  private map: any;
  private mapImage;

  private appId = environment.mapAppId;
  private appCode = environment.mapAppCode;

  constructor(
  private _formBuilder: FormBuilder,
  private pointsService:PointsService,
  private mapService: SearchService
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

    // for the map
    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
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

  initiatePoints(){
    // convert selected to the array
    // @ts-ignore
    this.selectedArray = Array.from(this.selection._selection);
    console.log('array is ', this.selectedArray)
    // initiate map
    //this.displayMap();
  }

  onNextClick(position, name){
    // get the map
    this.mapService.getImage()
      .subscribe(
        (response) => {
          this.mapImage = response;
          console.log(response)
        });

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
      // @ts-ignore
      this.pointsDetails.push(point);
    }
    localStorage.setItem('currentPoints', JSON.stringify(this.pointsDetails))
    console.log('our array', this.pointsDetails)
    // clear the form
    this.pointFormGroup.controls.challenge.setValue(' ');
    this.pointFormGroup.controls.sightseeing.setValue(' ');

    this.displayMap();
  }

  onBackClick(){

  }

  displayMap(){
    // make sure that the previous map is destroyed

    // initiate map
    console.log('create map')
    let defaultLayers = this.platform.createDefaultLayers();
    console.log('layers', defaultLayers)
    let map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: 37.7397, lng: -121.4252 }
      }
    );
    console.log('map', map)
  }
}

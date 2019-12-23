import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoadService} from "../../_services/roads/road.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MapViewService} from "../../_services/map/map-view.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-roads-edit',
  templateUrl: './roads-edit.component.html',
  styleUrls: ['./roads-edit.component.scss']
})
export class RoadsEditComponent implements OnInit, AfterViewInit {

  spinner = false;

  roadsForm: FormGroup;

  roadId: string;
  roadLocationName: any;

  // for the leaf map
  leafMap: any;
  leafMarker: any;

  targetsArray: Array<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private roadService: RoadService,
    private route: ActivatedRoute,
    private mapViewService: MapViewService,
    private _snackbar: MatSnackBar,
    private router: Router,
  ) { }

  get f() {
    return this.roadsForm.controls;
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.roadId = params.id);

    this.roadsForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      decoy: ['', [Validators.required, Validators.maxLength(250)]],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      locName: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      points: new FormArray([]),
      is_published: [false, Validators.required],
      is_deleted: [false, Validators.required]
    })

    this.editInit();
  }

  ngAfterViewInit() {
    this.leafMap = this.mapViewService.setLeafMap();
  }

  editInit() {
    this.spinner = true;

    // fetch the point
    this.roadService.getRoadById(this.roadId)
      .subscribe(response => {
        this.f.name.setValue(response['name']);
        this.f.decoy.setValue(response['decoy']);
        this.f.description.setValue(response['description']);

        this.roadLocationName = response['location']['name'];

        const position = [
          response['location']['latitude'],
          response['location']['longitude'],
          response['location']['name']
        ];

        this.onResultClick(position);

        this.targetsArray = response['targets']


        this.spinner = false;
      })
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

  moveTarget(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.targetsArray, event.previousIndex, event.currentIndex);
    console.log(event.previousIndex, event.currentIndex)
    // append correct next_target_id
    this.targetsArray[event.currentIndex]['next_taeget_id'] = this.targetsArray[event.currentIndex+1]['id']
    console.log('id of the current target', this.targetsArray[event.currentIndex]['id'])
  }

  onSubmit(){
    console.log('submitting', this.f)
    console.log(this.targetsArray)

    if(this.roadsForm.invalid){
      this._snackbar.open('Form invalid. Check the form for any mistakes', 'Dismiss', {
        duration: 3500
      });
      return;
    }
  }

  removeTargetFromRoad(targetIndex){
    let removedTarget = this.targetsArray[targetIndex];
    this.targetsArray.splice(targetIndex, 1);
    let removeSnackBar = this._snackbar.open('Point removed from the road', 'Undo', {
      duration: 3500
    });
    removeSnackBar.afterDismissed().subscribe(null, null, () => {
      this.targetsArray.splice(targetIndex,0, removedTarget)
    })

  }

  removeRoad(){
    // confirm action


    this.f.is_deleted.setValue(true);
    let id = this.roadId;
    console.log(this.f)
    this.roadService.updateRoad(this.f, this.roadId).subscribe(
      result => {
        this._snackbar.open('Road deleted', 'Dismiss', {
          duration: 3500
        });
        this.router.navigate(['/roads']);
      },
      error => {
        console.error(error)
        this._snackbar.open('Something went wrong, on our side. Please try again', 'Dismiss', {
          duration: 3500
        });
      }
        )
  }

}

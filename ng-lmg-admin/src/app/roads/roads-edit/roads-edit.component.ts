import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoadService} from "../../_services/roads/road.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MapViewService} from "../../_services/map/map-view.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ActionConfirmModalComponent} from "../../addons/action-confirm-modal/action-confirm-modal.component";

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
  is_published: boolean;

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
    public dialog: MatDialog
  ) { }

  get f() {
    return this.roadsForm.controls;
  }

  get targetsFormArray(){
    return this.f.points as FormArray;
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

        this.is_published = response['published']


        this.spinner = false;
      },
        error => {
          let errorSnackBar = this._snackbar.open('Error loading road', 'Reload', {
            duration: 3500
          });
          errorSnackBar.afterDismissed().subscribe(null, null, () => {
            window.location.reload();
          })
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
    this.targetsArray[event.currentIndex]['next_target_id'] = this.targetsArray[event.currentIndex+1]['id']
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

    this.targetsFormArray.clear();

    this.spinner = true;

    // sort targets and add them to the form
    console.log(this.targetsArray)
    for (let index in this.targetsArray){
      if(this.targetsArray[Number(index)+1] !== undefined) {
        this.targetsArray[index]['next_target_id'] = this.targetsArray[Number(index)+1]['id']
      }
      this.targetsFormArray.push(this._formBuilder.group({
        targetId: [this.targetsArray[index]['id']],
        pointId: [this.targetsArray[index]['point']['id'], Validators.required],
        sightseeing: [this.targetsArray[index]['explore_tip'], Validators.required],
        challenge: [this.targetsArray[index]['challenge_tip'], Validators.required],
        nextTargetId: [this.targetsArray[index]['next_target_id']]
      }))
    }

    console.log('form ', this.f)
    this.roadService.updateRoad(this.f, this.roadId).subscribe(
      response => {
        this.spinner = false;
        this._snackbar.open('Changes saved', 'Dismiss', {
          duration: 3500
        });
        this.router.navigate(['/roads']);
      },
      error => {
        this.spinner = false;
        this._snackbar.open('Something went wrong on our side', 'Dismiss', {
          duration: 3200
        })
      }
    )
  }

  removeTargetFromRoad(targetIndex){
    let removedTarget = this.targetsArray[targetIndex];
    this.targetsArray.splice(targetIndex, 1);
    let removeSnackBar = this._snackbar.open('Point removed from the road', 'Undo', {
      duration: 3500
    });
    removeSnackBar.onAction().subscribe(null, null, () => {
      this.targetsArray.splice(targetIndex,0, removedTarget)
    })

  }

  publishRoad(withhold?){
    if (withhold == true) {
      this.f.is_published.setValue(false);
    } else {
      this.f.is_published.setValue(true);
    }
    this.roadService.updateRoad(this.f, this.roadId)
      .subscribe(
        response => {
          this.is_published = response['published']
          let publishSnackbar;
          if (this.is_published == true) {
            publishSnackbar = this._snackbar.open('Road published', 'Withhold', {
              duration: 3500
            })
          } if (this.is_published == false) {
            publishSnackbar = this._snackbar.open('Road Withhold', 'Republish', {
              duration: 3500
            })
          }
          publishSnackbar.onAction().subscribe(() => {
            this.publishRoad(true)
          });
        },
        error => {
          this._snackbar.open('There was an error on our side. Try again', 'Dismiss', {
            duration: 3500
          })
        }
      )
  }

  removeRoad(){
    // confirm action
    const confirmDialog = this.dialog.open(ActionConfirmModalComponent)
    confirmDialog.afterClosed().subscribe(
      result => {
        if(result['confirm'] == false){
          return;
        }
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
    )
  }

}

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoadService} from "../../_services/roads/road.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MapViewService} from "../../_services/map/map-view.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ActionConfirmModalComponent} from "../../addons/action-confirm-modal/action-confirm-modal.component";
import {TargetsService} from "../../_services/targets/targets.service";
import {PointsSelectorModalComponent} from "../../addons/points-selector-modal/points-selector-modal.component";
import {Title} from "@angular/platform-browser";
import {TargetModifyModalComponent} from "../../addons/target-modify-modal/target-modify-modal.component";

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
    private titleService: Title,
    private _formBuilder: FormBuilder,
    private roadService: RoadService,
    private route: ActivatedRoute,
    private mapViewService: MapViewService,
    private _snackbar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private targetsService: TargetsService
  ) {
  }

  get f() {
    return this.roadsForm.controls;
  }

  get targetsFormArray() {
    return this.f.points as FormArray;
  }

  ngOnInit() {
    this.titleService.setTitle("Edit a road...");
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
      is_deleted: [false, Validators.required],
      loop: ['']
    });

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
          //this.targetsArray = response['targets'];
          if (response['targets'].length == 0 ){
            this._snackbar.open('Please remember to add targets', 'Dismiss', {
              duration: 3500
            });
          } else {
            this.targetsArray = this.targetsService.sortHierarchy(response['targets']);
            this.checkLoop();
          }

          this.is_published = response['published'];

          this.titleService.setTitle("Edit a "+response['name']);
          this.spinner = false;
        },
        error => {
          this.spinner = false;
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
    // append correct next_target_id
    this.targetsArray[event.currentIndex]['next_target_id'] = this.targetsArray[event.currentIndex + 1]['id'];
  }

  checkLoop() {
    /*
    check if loop is set to true
     */
    let firstTargetId = this.targetsArray[0]['id'];
    let lastTargetNextTargetId = this.targetsArray[this.targetsArray.length - 1]['next_target_id'];
    if (firstTargetId == lastTargetNextTargetId) {
      this.f.loop.setValue(true)
    } else {
      this.f.loop.setValue(false)
    }
  }

  setLoop() {
    /*
    We need to connect last target with the first one by next_target_id
    That can be done by looking at the hierarchy or by relying on targets array that is already
     */
    if (this.targetsArray.length < 2) {
      this._snackbar.open('Only roads with one target can be looped', 'Dismiss', {
        duration: 3500
      });
      this.f.loop.setValue(false);
      return false
    }

    this.targetsArray[this.targetsArray.length - 1]['next_target_id'] = this.targetsArray[0]['id'];
    console.log('loop yes')
  }

  onSubmit() {

    console.log('sending', )
    if (this.roadsForm.invalid) {
      this._snackbar.open('Form invalid. Check the form for any mistakes', 'Dismiss', {
        duration: 3500
      });
      return;
    }

    this.targetsFormArray.clear();

    this.spinner = true;

    // check if the road has a loop
    if (this.f.loop.value == true) {
      if (this.setLoop() == false) {
        this.spinner = false;
        return
      }
    }

    for (let index in this.targetsArray) {
      if (this.targetsArray[Number(index) + 1] !== undefined) {
        this.targetsArray[index]['next_target_id'] = this.targetsArray[Number(index) + 1]['id']
      }
      this.targetsFormArray.push(this._formBuilder.group({
        targetId: [this.targetsArray[index]['id']],
        pointId: [this.targetsArray[index]['point']['id'], Validators.required],
        sightseeing: [this.targetsArray[index]['explore_tip'], Validators.required],
        challenge: [this.targetsArray[index]['challenge_tip'], Validators.required],
        nextTargetId: [this.targetsArray[index]['next_target_id']],
        hierarchy: [index]
      }))
    }

    console.log('form ', this.f);
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

  removeTargetFromRoad(targetIndex) {
    let removedTarget = this.targetsArray[targetIndex];
    this.targetsArray.splice(targetIndex, 1);
    let removeSnackBar = this._snackbar.open('Point removed from the road', 'Undo', {
      duration: 3500
    });
    removeSnackBar.onAction().subscribe(null, null, () => {
      this.targetsArray.splice(targetIndex, 0, removedTarget)
    })

  }

  publishRoad(withhold?) {
    if ( this.targetsArray == undefined){
      this._snackbar.open('Please add targets before publishing the road', 'Dismiss', {
        duration: 3500
      });
      return;
    }
    if (withhold == true) {
      this.f.is_published.setValue(false);
    } else {
      this.f.is_published.setValue(true);
    }
    this.roadService.updateRoad(this.f, this.roadId)
      .subscribe(
        response => {
          this.is_published = response['published'];
          let publishSnackbar;
          if (this.is_published == true) {
            publishSnackbar = this._snackbar.open('Road published', 'Withhold', {
              duration: 3500
            })
          }
          if (this.is_published == false) {
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

  removeRoad() {
    // confirm action
    const confirmDialog = this.dialog.open(ActionConfirmModalComponent);
    confirmDialog.afterClosed().subscribe(
      result => {
        if (result['confirm'] == false) {
          return;
        }
        this.f.is_deleted.setValue(true);
        let id = this.roadId;
        console.log(this.f);
        this.roadService.updateRoad(this.f, this.roadId).subscribe(
          result => {
            this._snackbar.open('Road deleted', 'Dismiss', {
              duration: 3500
            });
            this.router.navigate(['/roads']);
          },
          error => {
            console.error(error);
            this._snackbar.open('Something went wrong, on our side. Please try again', 'Dismiss', {
              duration: 3500
            });
          }
        )
      }
    )
  }

  triggerPointsSelectorModal(){
    let pointsSelectionDialog =  this.dialog.open(PointsSelectorModalComponent,{
      data: this.targetsArray
    })
    pointsSelectionDialog.afterClosed().subscribe(
      result => {
        // trigger a new stepper in a dialog
        let newTargetsArray = Array.from(result.data.values())
        this.triggerTargetAddModal(newTargetsArray)
      }
    )
  }

  triggerTargetEditModal(target, index){
    console.log(target)
    let targetEditDialog = this.dialog.open(TargetModifyModalComponent, {
      data: {
        "type": "edit",
        "target": target
      }
    })
    targetEditDialog.afterClosed().subscribe(
      result => {
        if (result.confirm == false) {
          return
        }
        this.updateTargetInArray(result, index)
      }
    )
  }

  triggerTargetAddModal(targets: any[]){
    let targetsAddModal = this.dialog.open(TargetModifyModalComponent, {
      data: {
        "type": "new",
        "targets": targets
      }
    });
    targetsAddModal.afterClosed().subscribe(
      results => {
        this.addNewTargets(results.modifiedTarget.targets.value)
        // add results to the array
      }
    )
  }

  addNewTargets(targets){
    console.log('new targets', targets)
    for (let target of targets){
      this.targetsArray.push({
        "point": target['point'],
        "road_id": this.roadId,
        "explore_tip": target['sightseeing'],
        "challenge_tip": target['challenge'],
        "nextTargetId": null,
        "hierarchy": null
      })
    }
    console.log('new array', this.targetsArray)
  }

  updateTargetInArray(target, index){
    this.targetsArray[index]['challenge_tip'] = target['modifiedTarget']['challenge'];
    this.targetsArray[index]['explore_tip'] = target['modifiedTarget']['sightseeing']
  }
}

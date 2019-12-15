/*
POINTS ADD COMPONENT TS
TODO: Add error handling
TODO: Redirect to the points summary after successful request
 */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PointsService} from "../../_services/points/points.service";
import {NgxSpinnerService} from "ngx-spinner";
import {HereMapComponent} from "../../maps/here-map/here-map.component";
import { environment } from '@environments/environment';
import {MapViewService} from "../../_services/map/map-view.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";


@Component({
  selector: 'app-points-add',
  templateUrl: './points-add.component.html',
  styleUrls: ['./points-add.component.scss'],
  providers: [HereMapComponent]
})
export class PointsAddComponent implements OnInit {

  addNewPointForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  leafMap: any;
  leafMarker: any;

  // for the edit
  pointId: string;
  pointLocationName: Observable<string>;

  materialSpinner = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private pointsService: PointsService,
              private spinner: NgxSpinnerService,
              private mapViewService: MapViewService,
              private _snackBar: MatSnackBar) {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addNewPointForm.controls;
  }

  ngOnInit() {

    // check if editing or not
    this.route.params.subscribe( params => this.pointId = params.id)

    this.addNewPointForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      // description is technically not required for the database
      description: ['', [Validators.required, Validators.maxLength(250)]],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      locationName: ['', Validators.required]
    })

    this.leafMap = this.mapViewService.setLeafMap();

    if (this.pointId !== undefined){
      this.materialSpinner = true;
      console.log('edit')
      this.editInit();
    }
  }

  editInit(){
    // fetch the point
    this.pointsService.getPoint(this.pointId)
      .subscribe(result => {
        // set the form values
        this.f.name.setValue(result['name']);
        this.f.description.setValue(result['description']);
        this.f.latitude.setValue(result['location']['latitude'])
        this.f.longitude.setValue(result['location']['longitude'])
        this.f.locationName.setValue(result['location']['name'])

        // set the location and map
        this.pointLocationName = result['location']['name'];
        this.onResultClick([result['location']['latitude'],result['location']['longitude']])

        // stop the spinner
        this.materialSpinner = false;
        console.log(this.pointLocationName)
      })

  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addNewPointForm.invalid) {
      console.warn('form is invalid');
      return;
    }
    this.loading = true;
    const name = this.f.name.value;
    const desc = this.f.description.value;
    const lat = this.f.latitude.value;
    const lng = this.f.longitude.value;
    const locationname = this.f.locationName.value;

    this.materialSpinner = true;

    // define if it's edit or new point
    if (this.pointId !== undefined){
      this.pointsService.updatePoint(this.pointId, name, desc, lat, lng, locationname)
        .subscribe({
          next: response => this.onSuccessfulSubmit(response),
          error: err => {
            // TODO: Add error snackbar
            this.materialSpinner = false;
            console.log("The error is ", err)
            this.onFailedSubmit()
          }})
    } else {
      this.pointsService.addNewPoint(name, desc, lat, lng, locationname).subscribe({
        next: response => this.onSuccessfulSubmit(response),
        error: err => {
          // TODO: Add error snackbar
          this.materialSpinner = false;
          console.log("The error is ", err)
          this.onFailedSubmit()
        }
      });
    }

    return;
  }

  onSuccessfulSubmit(response) {
    console.log(response);
    this.materialSpinner = true;
    this.router.navigate(['/points']);
  }

  onFailedSubmit(){
    this._snackBar.open("An error occur, please check the form and submit again", "Dismiss", {
      duration: 60000,
    });
  }

  onResultClick(position) {
    // set the map in the right position and show the marker

    this.f.latitude.setValue(position[0]);
    this.f.longitude.setValue(position[1]);
    this.f.locationName.setValue(position[2]);

    if (this.leafMarker) {
      this.leafMarker.remove();
    }
    // @ts-ignore
    this.leafMap.setView(L.latLng(position[0], position[1]), 10)
    // @ts-ignore
    this.leafMarker= L.marker([position[0], position[1]]).addTo(this.leafMap);

  }

  passTheResults(results) {
  }


}

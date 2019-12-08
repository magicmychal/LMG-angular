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

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private pointsService: PointsService,
              private spinner: NgxSpinnerService,
              private mapViewService: MapViewService) {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addNewPointForm.controls;
  }

  ngOnInit() {
    this.addNewPointForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      // description is technically not required for the database
      description: ['', [Validators.required, Validators.maxLength(250)]],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      locationName: ['', Validators.required]
    })

    this.leafMap = this.mapViewService.setLeafMap();
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

    this.spinner.show();

    this.pointsService.addNewPoint(name, desc, lat, lng, locationname).subscribe({
      next: response => this.onSuccessfulSubmit(response),
      error: err => console.log("The error is ", err)
    });

    return;
  }

  onSuccessfulSubmit(response) {
    console.log(response);
    this.spinner.hide();
    this.router.navigate(['/points']);
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

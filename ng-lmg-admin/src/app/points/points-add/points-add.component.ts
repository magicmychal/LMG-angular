/*
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

  public query: string;

  leafMap: any;
  leafMarker: any;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private pointsService: PointsService,
              private spinner: NgxSpinnerService,
              private map: HereMapComponent) {
    this.query = "Krakow";
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

    this.setLeafMap();
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

  setLeafMap() {
    const here = {
      id: environment.mapAppId,
      code: environment.mapAppCode
    }
    const style = 'reduced.day';
    /*
    Styles available:
    normal.day
    normal.day.grey
    normal.day.transit
    reduced.day
    normal.night
    reduced.night
    pedestrian.day

     */

    const hereTileUrl = `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=${here.id}&app_code=${here.code}&ppi=320`;

    // @ts-ignore
    // @ts-ignore
    this.leafMap = L.map('mapid', {
      center: [52.491646, 19.230499],
      zoom: 6,
      layers: [L.tileLayer(hereTileUrl)]
    });
    this.leafMap.attributionControl.addAttribution('&copy; HERE 2019');
  }

}

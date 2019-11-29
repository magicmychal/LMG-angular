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

  lat: number;
  lng: number;


  public query: string;

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
      locationName: ['']
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

    this.spinner.show();

    this.pointsService.addNewPoint(name, desc, lat, lng, locationname).subscribe({
      next: response => this.onSuccessfulSubmit(response),
      error: err => console.log("The error is ", err)
    });

    return;
  }

  clickOnMarker(location) {
    this.f.latitude.setValue(location[0]["lat"]);
    this.f.longitude.setValue(location[0]["lng"]);
    this.f.locationName.setValue(location[1]);
  }

  onSuccessfulSubmit(response){
    console.log(response);
    this.router.navigate(['/points']);
    this.spinner.hide();
  }

  onNotifyClicked(message: string):void{
    console.log('Wiadomosc do panstwa, ',message);
  }

  onResultClick(position){
    // set the map in the right position and show the marker
    console.log(position);
    this.lat = position[0];
    this.lng = position[1];
    this.map.changeMapPosition();

  }

  passTheResults(results){
  console.log('wyniki,', results.results);
  this.map.passPlaces(results.results);
  }

}

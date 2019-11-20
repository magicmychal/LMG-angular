import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HereMapComponent} from "../../maps/here-map/here-map.component";

@Component({
  selector: 'app-points-add',
  templateUrl: './points-add.component.html',
  styleUrls: ['./points-add.component.scss']
})
export class PointsAddComponent implements OnInit {

  addNewPointForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  public query: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,) {
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

  onSubmit(){
    // get the location from the marker
    //console.log('location is ', HereMapComponent.returnSelectedPlace());

    console.log('submitted')
    this.submitted = true;

    // stop here if form is invalid
    if (this.addNewPointForm.invalid){
      console.warn('form is invalid')
      //return;
    }

    this.loading = true;
    console.log("name", this.f.name.value);
    console.log("description", this.f.description.value);
    console.log("lat", this.f.latitude.value);
    console.log("lng", this.f.longitude.value);
    console.log("locationname", this.f.locationName.value);

    return;
  }

  clickOnMarker(location){
    this.f.latitude.setValue(location["lat"]);
    this.f.longitude.setValue(location["lng"]);
  }

}

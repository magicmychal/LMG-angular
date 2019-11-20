/*
TODO: Add error handling
TODO: Redirect to the points summary after successful request
 */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PointsService} from "../../_services/points/points.service";

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
              private router: Router,
              private pointsService: PointsService) {
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
    const locationname = "location";

    this.pointsService.addNewPoint(name, desc, lat, lng, locationname).subscribe({
      next: response => console.log(response),
      error: err => console.log("The error is ", err)
    });

    return;
  }

  clickOnMarker(location) {
    this.f.latitude.setValue(location["lat"]);
    this.f.longitude.setValue(location["lng"]);
  }

}

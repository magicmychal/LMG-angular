import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from "../_services";
import {NgxSpinnerService} from "ngx-spinner";
import {fakeAsync} from "@angular/core/testing";
import {log} from "util";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  invalid = false;
  returnUrl: string;
  error = '';
  spinner = false;

  roadUrl = '/roads'



  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.route.queryParams.subscribe(
      params => (this.returnUrl = params.redirectUrl || '/')
    );
  }

  onSubmit() {
   this.submitted = true;
    this.invalid = false;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.invalid = true;
      return;
    }

    console.log('return', this.returnUrl)
    this.spinner = true;
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]).then(whatever => console.log(whatever), error => console.log(error));
        },
        error => {
          this.spinner = false;
          this.submitted = false;
          this.invalid = true;
          this.loading = false;
        })
  }

}

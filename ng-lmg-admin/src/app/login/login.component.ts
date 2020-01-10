import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from "../_services";
import {NgxSpinnerService} from "ngx-spinner";
import {fakeAsync} from "@angular/core/testing";



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

    // get return url from route parameters or default to '/'
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl'] || '/');
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
   this.submitted = true;
    this.invalid = false;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.invalid = true;
      return;
    }

    this.spinner = true;
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          //TODO: the navigation links are broken
         this.router.navigate([this.returnUrl]);
         //location.reload(true);
        },
        error => {
          this.spinner = false;
          this.submitted = false;
          this.invalid = true;
          this.loading = false;
        },
        () => {
          this.spinner = false;
          this.submitted = false;
        });
  }

}

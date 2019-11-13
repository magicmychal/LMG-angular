import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = FormGroup;

  constructor(
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  Login() {
    console.log('loginingngnig...')
  }
}

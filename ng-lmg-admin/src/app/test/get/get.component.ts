import { Component, OnInit } from '@angular/core';
import {RequestService} from "./request.service";

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {

  constructor(
    private request: RequestService
  ) { }

  ngOnInit() {

  }

  clickme(){
    console.log('clicked');
      this.request.getSomething()
        .subscribe({
          next: response => console.log(response),
          error: err => console.log("The error is ", err)})//.subscribe((response)=>console.log('response', response));
  }

}

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
      this.request.getSomething().subscribe((response)=>console.log('response', response));
  }

}

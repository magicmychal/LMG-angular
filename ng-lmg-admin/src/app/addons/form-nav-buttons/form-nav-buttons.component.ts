import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-nav-buttons',
  templateUrl: './form-nav-buttons.component.html',
  styleUrls: ['./form-nav-buttons.component.scss']
})
export class FormNavButtonsComponent implements OnInit {

  @Input()
  public previous: boolean;

  @Input()
  public cancel: boolean;

  @Input()
  public next: boolean;

  @Input()
  public save: boolean;

  constructor() { }

  ngOnInit() {
  }

}

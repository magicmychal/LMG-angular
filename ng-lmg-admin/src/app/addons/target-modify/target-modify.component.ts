import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-target-modify',
  templateUrl: './target-modify.component.html',
  styleUrls: ['./target-modify.component.scss']
})
export class TargetModifyComponent implements OnInit {

  targetForm: FormGroup;
  spinner:boolean = false;

  @Input() public target: object;

  constructor(
    private _formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.spinner = true;

    console.log('target', this.target)

    this.targetForm = this._formBuilder.group({
      sightseeing: ['', [Validators.required, Validators.maxLength(250)]],
      challenge: ['', [Validators.required, Validators.maxLength(250)]]
    })

    if (this.target !== undefined) {
      this.targetForm.controls.sightseeing.setValue(this.target['challenge_tip']);
      this.targetForm.controls.challenge.setValue(this.target['challenge_tip']);
        /*// add new values
        this.targetForm.addControl('id', new FormControl(this.target['id'], Validators.required));
        this.targetForm.addControl('code', new FormControl(this.target['code'], Validators.required));*/
    }
    this.spinner = false;
  }

}

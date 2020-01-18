import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-target-stepper',
  templateUrl: './target-stepper.component.html',
  styleUrls: ['./target-stepper.component.scss']
})
export class TargetStepperComponent implements OnInit {

  stepperForm: FormGroup;

  @Input() public targets: [];

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  get targetsArray() {
    return this.stepperForm.controls.targets as FormArray;
  }

  ngOnInit() {
    // create an empty form
    this.stepperForm = this._formBuilder.group({
      targets: new FormArray([])
    });

    if (this.targets !== undefined) {
      //setup the form
      for (let target of this.targets){
        let pointId = target['id'];
        this.targetsArray.push(this._formBuilder.group({
          point: target,
          sightseeing: ['', Validators.required],
          challenge: ['', Validators.required]
        }))
      }
    }
  }

}

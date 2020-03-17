import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-target-modify-modal',
  templateUrl: './target-modify-modal.component.html',
  styleUrls: ['./target-modify-modal.component.scss']
})
export class TargetModifyModalComponent implements OnInit, OnDestroy {

  spinner: boolean = false;
  originalTitle: string;

  isButtonDisabled: boolean = false;

  @ViewChild('targetModifyComponent', {static: false}) targetModifyComponent;
  @ViewChild('targetStepperForm', {static: false}) targetStepperForm;

  constructor(
    private titleService: Title,
    public dialogRef: MatDialogRef<TargetModifyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.spinner = true;
    this.originalTitle = this.titleService.getTitle();
    this.titleService.setTitle('Modify target(s)');
    console.log('data', this.data)
  }

  ngOnDestroy() {
    this.titleService.setTitle(this.originalTitle)
  }

  confirmEdit() {
    let modifiedTarget = {
      'sightseeing': this.targetModifyComponent.targetForm.controls.sightseeing.value,
      'challenge': this.targetModifyComponent.targetForm.controls.challenge.value,
      'id': this.targetModifyComponent.targetForm.controls.id.value
    }
    this.dialogRef.close({
      confirm: true,
      type: "edit",
      modifiedTarget: modifiedTarget
    })
  }

  confirmAdd() {
    if (this.targetStepperForm.stepperForm.invalid) {
      return;
    }
    let newTargetsForm = this.targetStepperForm.stepperForm.controls;
    this.dialogRef.close({
      confirm: true,
      type: "new",
      modifiedTarget: newTargetsForm
    })
  }

  close(): void {
    this.dialogRef.close({
      confirm: false
    });
  }

}

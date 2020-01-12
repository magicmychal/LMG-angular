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

  @ViewChild('targetModifyComponent', {static: false}) targetModifyComponent;

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


  }

  ngOnDestroy() {
    this.titleService.setTitle(this.originalTitle)
  }

  confirm() {
    let modifiedTarget = {
      'sightseeing': this.targetModifyComponent.targetForm.controls.sightseeing.value,
      'challenge': this.targetModifyComponent.targetForm.controls.challenge.value
    }
    this.dialogRef.close({
      confirm: true,
      modifiedTarget: modifiedTarget
    })
  }

  close(): void {
    this.dialogRef.close({
      confirm: false
    });
  }

}

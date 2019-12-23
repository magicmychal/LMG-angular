import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-action-confirm-modal',
  templateUrl: './action-confirm-modal.component.html',
  styleUrls: ['./action-confirm-modal.component.scss']
})
export class ActionConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ActionConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  confirm(){
    this.dialogRef.close({
      confirm: true
    })
  }

  close(): void {
    this.dialogRef.close({
      confirm: false
    });
  }
}

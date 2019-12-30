import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-points-selector-modal',
  templateUrl: './points-selector-modal.component.html',
  styleUrls: ['./points-selector-modal.component.scss']
})
export class PointsSelectorModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PointsSelectorModalComponent>,
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

import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {log} from "util";

@Component({
  selector: 'app-points-selector-modal',
  templateUrl: './points-selector-modal.component.html',
  styleUrls: ['./points-selector-modal.component.scss']
})
export class PointsSelectorModalComponent implements OnInit, AfterViewInit {

  @ViewChild('pointSelector', {static: false}) pointSelector;

  constructor(
    public dialogRef: MatDialogRef<PointsSelectorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  confirm(){
    console.log(this.pointSelector.selection._selection)
    this.dialogRef.close({
      confirm: true,
      data: this.pointSelector.selection._selection
    })
  }

  close(): void {
    this.dialogRef.close({
      confirm: false
    });
  }
}

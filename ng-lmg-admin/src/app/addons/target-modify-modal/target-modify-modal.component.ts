import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-target-modify-modal',
  templateUrl: './target-modify-modal.component.html',
  styleUrls: ['./target-modify-modal.component.scss']
})
export class TargetModifyModalComponent implements OnInit, OnDestroy {

  spinner:boolean = false;
  originalTitle: string;
  target: object;

  constructor(
    private titleService: Title,
    public dialogRef: MatDialogRef<TargetModifyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.spinner = true;
    this.originalTitle = this.titleService.getTitle();
    this.titleService.setTitle('Modify target(s)');
  }
  ngOnDestroy() {
    this.titleService.setTitle(this.originalTitle)
  }

  confirm(){
    this.dialogRef.close({
      confirm: true,
    })
  }

  close(): void {
    this.dialogRef.close({
      confirm: false
    });
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MapViewService} from "../../_services/map/map-view.service";

@Component({
  selector: 'app-mapmodal',
  templateUrl: './mapmodal.component.html',
  styleUrls: ['./mapmodal.component.scss']
})
export class MapmodalComponent implements OnInit {

  // for the leaf map
  leafMap: any;
  leafMarker: any;
  private L: any;

  constructor(
    public mapViewService: MapViewService,
    public dialogRef: MatDialogRef<MapmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.leafMap = this.mapViewService.setLeafMap();

    // @ts-ignore
    this.leafMap.setView(L.latLng(this.data.lat, this.data.lng), 16)
    // @ts-ignore
    this.leafMarker= L.marker([this.data.lat, this.data.lng]).addTo(this.leafMap);
  }

  close(): void {
    this.dialogRef.close();
  }
}

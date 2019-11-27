import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from "@environments/environment";

declare var H: any;

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss']
})
export class MapImageComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild("map")
  public mapElement: ElementRef;
  @Input()
  public lat: any;
  @Input()
  public lng: any;
  @Input()
  public width: any;
  @Input()
  public height: any;
  private platform: any;
  private map: any;

  private appId = environment.mapAppId;
  private appCode = environment.mapAppCode;


  constructor() {
/*    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });*/
  }

  ngOnInit() {
    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    let map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: 37.7397, lng: -121.4252 }
      }
    );
  }



}

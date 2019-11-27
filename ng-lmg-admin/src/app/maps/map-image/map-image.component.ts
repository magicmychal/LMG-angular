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
  private ui: any;
  private search: any;
  private map: any;

  private appId = environment.mapAppId;
  private appCode = environment.mapAppCode;


  constructor() { }

  ngOnInit() {
    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });

    this.lat = 50.857448;
    this.lng = 16.487394;
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 6,
        center: {lat: this.lat, lng: this.lng}
      }
    );
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }



}

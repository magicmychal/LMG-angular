/*
Check out tutorial here https://developer.here.com/blog/displaying-places-on-a-here-map-in-an-angular-web-application
TODO: Adjust the initial scale of the map
 */
import {Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {environment} from "@environments/environment";
import {fromEvent} from "rxjs";

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit, AfterViewInit {
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
  private ui: any;
  private search: any;
  private platform: any;

  public markerLocation: any;

  private appId = environment.mappAppId;
  private appCode = environment.mapAppCode;


  @Output() getMarkerLocation = new EventEmitter();

  constructor() {
  }

  ngOnInit() {


    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: {lat: this.lat, lng: this.lng}
      }
    );
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }

  public places(query: string) {
    this.map.removeObjects(this.map.getObjects());
    this.search.request({"q": query, "at": this.lat + "," + this.lng}, {}, data => {
      for (let i = 0; i < data.results.items.length; i++) {
        this.dropMarker({
          "lat": data.results.items[i].position[0],
          "lng": data.results.items[i].position[1]
        }, data.results.items[i]);
      }
    }, error => {
      console.error(error);
    });
  }

  private dropMarker(coordinates: any, data: any) {
    let marker = new H.map.Marker(coordinates);
    marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");
    marker.addEventListener('tap', event => {
      let bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.markerLocation = event.target.getPosition()
      //console.log(this.getMarkerLocation)
      this.getMarkerLocation.emit(event.target.getPosition())
      this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  }

}

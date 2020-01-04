import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MapViewService {

  leafMap: any;
  leafMarker: any;

  constructor() { }

  setLeafMap() {
    const here = {
      id: environment.mapAppId,
      code: environment.mapAppCode
    }
    const style = 'reduced.day';
    /*
    Styles available:
    normal.day
    normal.day.grey
    normal.day.transit
    reduced.day
    normal.night
    reduced.night
    pedestrian.day

     */

    const hereTileUrl = `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=${here.id}&app_code=${here.code}&ppi=320`;

    // @ts-ignore
    this.leafMap = L.map('mapid', {
      center: [52.491646, 19.230499],
      zoom: 6,
      // @ts-ignore
      layers: [L.tileLayer(hereTileUrl)]
    });
    this.leafMap.attributionControl.addAttribution('&copy; HERE 2020');

    return this.leafMap;
  }
}

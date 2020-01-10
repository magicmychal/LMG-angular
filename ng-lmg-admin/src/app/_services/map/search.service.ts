import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpClientJsonpModule} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl: string = `https://places.api.here.com/places/v1/discover/search?app_id=${environment.mapAppId}&app_code=${environment.mapAppCode}&at=52.2516%2C18.7177&Accept-Language=pl&q=`;

  constructor(
    private http: HttpClient
    ) {
  }

  search(queryString: string) {
    let URL = this.baseUrl + queryString;
    /*return this.http.jsonp(URL, "&callback=this.returnJsonp()").pipe(
      map(this.extractData));*/
    return this.http.get<any>(URL).pipe(
      map(this.extractData));
  }

  returnJsonp(data?){
    console.log('if theres data', data)
    return data
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getImage(){
    // f - type of the map. 5 = svg
    let f = '1';
    // width and height is in pixels
    let width = '500';
    let height = '500';
    let lat = '52.5159';
    let lng = '13.3777';
    //let URL = `https://image.maps.api.here.com/mia/1.6/mapview?c=${{lat}}%2C${{lng}}&z=14&w=${{width}}&h=${{height}}&f=${{f}}&app_id=${environment.mapAppId}&app_code=${environment.mapAppCode}`
    let URL = `https://image.maps.api.here.com/mia/1.6/mapview?c=52.5159%2C13.3777&z=14&w=500&h=400&f=1&app_id=${environment.mapAppId}&app_code=${environment.mapAppCode}`

    return this.http.get(URL).pipe(
      map(this.extractData)
    );
  }
}

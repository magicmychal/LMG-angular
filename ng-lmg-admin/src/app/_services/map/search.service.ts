import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl: string = `https://places.demo.api.here.com/places/v1/discover/search?app_id=${environment.mappAppId}&app_code=${environment.mapAppCode}&at=52.2516%2C18.7177&q=`;

  constructor(private http: HttpClient) {
  }

  search(queryString: string) {
    let URL = this.baseUrl + queryString;
    //return this.http.get(URL);
    return this.http.get<any>(URL).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}

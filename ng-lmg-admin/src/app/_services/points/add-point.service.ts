import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AddPointService {

  constructor(private http: HttpClient) { }

  addNewPoint(name, description, lat, lng, locationName){
    const body = {
      "name":name,
      "description":description,
      "location":{
        "latitude":lat,
        "longitude":lng,
        "name":locationName
      }
    }

    return this.http.post<any>(`${environment.apiUrl}/point`, body).pipe(
      map(this.extractData));

  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}

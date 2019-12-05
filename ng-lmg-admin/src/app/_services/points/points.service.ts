import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private http: HttpClient) {
  }

  addNewPoint(name, description, lat, lng, locationName) {
    const body = {
      "name": name,
      "description": description,
      "location": {
        "latitude": lat,
        "longitude": lng,
        "name": locationName
      }
    };

    return this.http.post<any>(`${environment.apiUrl}/point`, body).pipe(
      map(this.extractData));
  }

  // get points will only fetch the data assigned to the currently logged in user
  getPoints() {
    return this.http.get<any>(`${environment.apiUrl}/point`).pipe(
      map(this.extractData));
  }

  getPointsArray(): Observable<any[]>{
    return this.http.get<any>(`${environment.apiUrl}/point`);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}

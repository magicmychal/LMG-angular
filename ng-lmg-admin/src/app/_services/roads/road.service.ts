import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoadService {

  routeId: any;
  // initiate the next_target_id
  nextTargetId = null;

  constructor(private http: HttpClient) {
  }

  getRoads() {
    return this.http.get<any>(`${environment.apiUrl}/road`).pipe(
      map(this.extractData));
  }

  getRoadById(id) {
    return this.http.get<any>(`${environment.apiUrl}/road/${id}`).pipe(
      map(this.extractData));
  }

  updateRoad(road, id) {
    const body = {
      "name": road.name.value,
      "decoy": road.decoy.value,
      "description": road.description.value,
      "location": {
        "name": road.locName.value,
        "longitude": road.lng.value,
        "latitude": road.lat.value
      },
      "targets": [],
      "is_published": road.is_published.value,
      "is_deleted": road.is_deleted.value
    };


    for (let point of road['points'].value) {
      let target = {
        "id": point['targetId'],
        "challenge_tip": point['challenge'],
        "explore_tip": point['sightseeing'],
        "point_id": point['pointId'],
        "next_target_id": point['nextTargetId'],
        "hierarchy": point['hierarchy']
      };

      body.targets.push(target)
    }

    console.log(body)
    return this.http.put<any>(`${environment.apiUrl}/road/${id}`, body).pipe(
      map(this.extractData));

  }

  addNewRoute(form) {
    /*
    First, we need to get the name of the route and description, decoy, and location
     */
    let name = form.name.value;
    let decoy = form.decoy.value;
    let description = form.description.value;
    let lat = form.lat.value;
    let lng = form.lng.value;
    let locName = form.locName.value;

    let points: [] = form.points.value;

    const body = {
      "name": name,
      "decoy": decoy,
      "description": description,
      "location": {
        "name": locName,
        "longitude": lng,
        "latitude": lat
      },
      "targets": [],
      "is_published": false,
      "is_deleted": false
    };

    for (let point of points) {
      let target = {
        "challenge_tip": point['challenge'],
        "explore_tip": point['sightseeing'],
        "point_id": point['pointId'],
        "next_target_id": null
      };

      body.targets.push(target)
    }
    // make a call
    let responseStatus = false;
    return this.http.post<any>(`${environment.apiUrl}/road`, body).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}

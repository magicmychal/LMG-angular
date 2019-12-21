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

  getRoadById(id){
    return this.http.get<any>(`${environment.apiUrl}/road/${id}`).pipe(
      map(this.extractData));
  }

  addNewRouteOLD(form) {

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
      }
    };

    //add new route
    this.http.post<any>(`${environment.apiUrl}/road`, body)
      .subscribe(
        (response) => {
          let routeId = response.id;
          console.log('new route', response);
          // if everything goes well, add targets
          console.log('id', routeId);
          let addTargets = this.addTargets(points, routeId);
          return addTargets == true ? true : false
        },
        (error) => {
          // do something to stop
          console.error('new route', error);
          return false;
        }
      )
  }

  addTargets(points, routeId) {
    // reverse array
    points = points.reverse();


    console.log('initial next target is', this.nextTargetId);

    // loop through the reverse points
    for (let index in points) {

      let body = {
        "challenge_tip": points[index].challenge,
        "explore_tip": points[index].sightseeing,
        "point_id": points[index].pointId,
        "road_id": routeId
      };

      // tu nie działa!
      if (this.nextTargetId !== null) {
        console.warn('next target in the loop is', this.nextTargetId);
        // @ts-ignore
        body.next_target_id = this.nextTargetId
      }

      console.log('the full body request', body);

      let response = this.http.post<any>(`${environment.apiUrl}/target`, body);
      forkJoin(response);


      console.error('id from the response', this.nextTargetId)
    }

    // done, we can return
    return true;
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
      "targets": []
    };

    for (let point of points) {
      console.log(point);

      let target = {
        "challenge_tip": point['challenge'],
        "explore_tip": point['sightseeing'],
        "point_id": point['pointId'],
        "next_target_id": null
      };

      body.targets.push(target)
    }

    console.log(body)

    // make a call
    let responseStatus = false
    return this.http.post<any>(`${environment.apiUrl}/road`, body).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}

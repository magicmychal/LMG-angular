import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  routeId: any;

  constructor(private http: HttpClient) {
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
        "longitude": lat,
        "latitude": lng
      }
    };

    //add new route
     this.http.post<any>(`${environment.apiUrl}/road`, body)
       .subscribe(
         (response) => {
           let routeId = response.id;
           console.log('new route', response)
           // if everything goes well, add targets
           console.log('id', routeId)
           let addTargets = this.addTargets(points, routeId)
           return addTargets == true ?  true :  false
         },
       (error) => {
           // do something to stop
         console.error('new route', error);
         return false;
       }
         )
  }

  addTargets(points, routeId){
// loop through the points
    for (let index in points) {
      // set the next index; used to define if the next_target_id is possible
      let nextInLine = Number(index) + 1;
      // @ts-ignore
      let body = {
        "challenge_tip": points[index].challenge,
        "explore_tip": points[index].sightseeing,
        "point_id": points[index].pointId,
        "road_id": routeId
      };

      if (typeof points[nextInLine] !== 'undefined'){
        // @ts-ignore
        body.next_target_id = points[nextInLine].pointId
      }

      console.log(index, 'point', body)

      this.http.post<any>(`${environment.apiUrl}/target`, body)
        .subscribe(
          (response) => {
            console.log('new target', response)
          },
          (error) => {
            // do something to stop
            console.error('new target', error);
            return false;
          }
        )
    }

    // done, we can return
    return true;
  }

}

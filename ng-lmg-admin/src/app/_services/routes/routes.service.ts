import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http: HttpClient) {
  }

  addNewRoute(form) {
    //deconstruct the form
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
    /* this.http.post<any>(`${environment.apiUrl}/road`, body)
       .subscribe(
         (response) => {
           let routeId = response.id;
         },
       (error) => {
           // do something to stop
         console.error(error);
         return;
       }
         )*/
    //add targets
    /*
    Every point that was passes will be
    {
      "challenge_tip":"challenge tip",
      "explore_tip":"explore tip",
      "point_id":"903d739c-7c24-4955-bfc1-d591dd8803d7",
      "road_id":"457f359d-6671-46e7-b430-693f10f00735",
      "next_target_id":"17d9054a-d85a-49f5-8d3a-ce80e56b6d31" (optional)
    }
   */

    for (let index in points) {
      let nextInLine = Number(index) + 1;
      let body = {
        "challenge_tip": points[index].challenge,
        "explore_tip": points[index].sightseeing,
        "point_id": points[index].pointId,
        "road_id": locName
      };

      if (typeof points[nextInLine] !== 'undefined'){
        body.next_target_id = points[nextInLine].pointId
      }
      console.log(body)
    }
  }

}

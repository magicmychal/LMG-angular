import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http: HttpClient) { }

  addNewRoute(form){
    //deconstruct the form
    /*
    First, we need to get the name of the route and description, decoy, and location
     */
    //add new route

    //add targets
  }

}

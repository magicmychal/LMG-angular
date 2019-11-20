import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  //endpoint = "https://jsonplaceholder.typicode.com/users/1";
  //endpoint = "/api/v1/login/admin";
  endpoint = "http://www.api.kompas.omteam.pl/v1/login/admin";

  constructor(
    private http: HttpClient
  ) { }

  getSomething(){
    const httpOptions = {
      headers: new HttpHeaders().set("Admin-Password", "test1234").set("Admin-Email", "admin@test.pl")
    };
    /*return this.http.get(this.endpoint, httpOptions).pipe(
      map(this.extractData));*/
    return this.http.get(this.endpoint, {headers: {"Admin-Password": "test1234"} }).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}

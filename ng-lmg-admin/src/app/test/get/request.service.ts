import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  endpoint = "https://jsonplaceholder.typicode.com/todos/1";
  //endpoint = "http://54.38.52.218:2137/v1/login/admin"

  constructor(
    private http: HttpClient
  ) { }

  getSomething(){
    const httpOptions = {
      headers: new HttpHeaders({
        "Admin-Email": "test@admin",
        "Admin-Password": "test1234",
      })
    };
    return this.http.get(this.endpoint, httpOptions).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}

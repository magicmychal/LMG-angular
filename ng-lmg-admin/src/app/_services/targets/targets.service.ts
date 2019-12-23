import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TargetsService {

  constructor(private http: HttpClient) { }

  getTargetById(id){
    /*return this.http.get<any>(`${environment.apiUrl}/road/${id}`).pipe(
      map(this.extractData));*/
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Globals} from "../../globals";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  endpoint = "http://54.38.52.218:2137/v1//login/admin";


  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  /*
  extractData() helps converting the observable response into something usable
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  login(email: string, password: string):Observable<any> {
    // Set the headers
    const headers = new HttpHeaders()
      .append("Admin-Email", email)
      .append("Admin-Password", password)
    return this.http.get(this.endpoint, {headers: headers})
      .pipe(map(this.extractData));

    /*this.http.post(this.endpoint, {email: email, password: password})
      .subscribe((resp: any) => {
        localStorage.setItem('auth_token', resp.token);
        localStorage.setItem('user_id', resp.id);
        // dispatch an action
        const userInfo = {
          _id: resp.id, Name: resp.Name, Email: resp.Email, Password: resp.Password, Gender: resp.Gender
          , History: []
        }
        this.store.dispatch(new UserActions.LogIn(userInfo));
        this.router.navigate(['/home']);
      }, err => document.getElementById("wrong")
        .style.display = "block"),
      document.getElementById('dropdownMenu1')
        .setAttribute("data-toggle", "");*/
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

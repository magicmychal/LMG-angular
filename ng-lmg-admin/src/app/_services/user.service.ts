/*
The user service contains a method for getting all users from the api, I included it to demonstrate accessing a secure
api endpoint with the http authorization header set after logging in to the application, the auth header is set with
a JWT token with the JWT Interceptor above. The secure endpoint in the example is a fake one implemented in the fake
backend provider above.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
}

/*
The JWT Interceptor intercepts http requests from the application to add a JWT auth auth_token to the Authorization header if
the user is logged in.

It's implemented using the HttpInterceptor class included in the HttpClientModule, by extending the HttpInterceptor
class you can create a custom interceptor to modify http requests before they get sent to the server.

Http interceptors are added to the request pipeline in the providers section of the app.module.ts file.

tl;dr auth auth_token will be added with each request

*/

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt auth_token if available
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.auth_token) {
      request = request.clone({
        setHeaders: {
          auth_token: currentUser.auth_token
        }
      });
    }

    return next.handle(request);
  }
}

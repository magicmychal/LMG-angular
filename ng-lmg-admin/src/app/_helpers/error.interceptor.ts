/*
The Error Interceptor intercepts http responses from the api to check if there were any errors. If there is a 401
Unauthorized response the user is automatically logged out of the application, all other errors are re-thrown up to
the calling service so an alert with the error can be displayed on the screen.

It's implemented using the HttpInterceptor class included in the HttpClientModule, by extending the HttpInterceptor
class you can create a custom interceptor to catch all error responses from the server in a single location.

Http interceptors are added to the request pipeline in the providers section of the app.module.ts file.
 */

import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthenticationService} from '../_services';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 && this.authenticationService.currentUserValue) {
        // auto logout if 401 response returned from api && the user is currently logged in
        let errorSnackbar = this._snackBar.open("Your session has expired. Please log in again", "Dismiss", {
          duration: 60000,
        });
        errorSnackbar.afterDismissed().subscribe(null, null, () => {
          this.authenticationService.logout();
          location.reload(true);
        })
      }
      if (err.status === 500) {
        let errorSnackbar = this._snackBar.open("An error occur, please reload the page", "Reload", {
          duration: 60000,
        });
        errorSnackbar.onAction().subscribe(null, null, () => {
          window.location.reload();
        })
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}

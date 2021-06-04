import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  API_BASE_URL = `${environment.API_BASE_URL}`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  signUpServiceApi(data){
    let url = this.API_BASE_URL+'/auth/register';
    return this.http.post(url, data).pipe(
      catchError(err => {
        if(err.status == 409 || err.status == 401){
          this.snackBar.open(err.error.message, 'Dismiss', {
            duration: 3000,
          });
        }
        
        return throwError(err);
      })
    )
  }

  logInServiceApi(data){
    let url = this.API_BASE_URL+'/auth/login';
    return this.http.post(url, data).pipe(
      catchError(err => {
        return throwError(err);
      })
    )
  }

  verifyEmailServiceApi(data){
    let url = this.API_BASE_URL+'/auth/verification';
    return this.http.post(url, data).pipe(
      catchError(err => {
        if(err.status == 409 || err.status == 401){
          this.snackBar.open(err.error.message, 'Dismiss', {
            duration: 3000,
          });
        }
        return throwError(err);
      })
    )
  }

}

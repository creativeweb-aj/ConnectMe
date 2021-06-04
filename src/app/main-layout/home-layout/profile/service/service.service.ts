import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Posts } from '../../common/posts';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  API_BASE_URL = `${environment.API_BASE_URL}`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  currentUserProfileServiceApi(){
    let url = this.API_BASE_URL+'/auth/profile';
    return this.http.get(url).pipe(
      catchError(err => {
        if(err.status == 401){
          this.snackBar.open(err.error.detail, 'Dismiss', {
            duration: 3000,
          });
        }
        return throwError(err);
      })
    )
  }

  userProfileServiceApi(data){
    let url = this.API_BASE_URL+'/auth/user-profile';
    return this.http.post(url, data).pipe(
      catchError(err => {
        if(err.status == 401){
          this.snackBar.open(err.error.detail, 'Dismiss', {
            duration: 3000,
          });
        }else if(err.status == 406){

        }
        return throwError(err);
      })
    )
  }

  updateProfileServiceApi(data){
    let url = this.API_BASE_URL+'/auth/edit-profile';
    return this.http.post(url, data).pipe(
      catchError(err => {
        if(err.status == 401){
          this.snackBar.open(err.error.detail, 'Dismiss', {
            duration: 3000,
          })
        }
        return throwError(err);
      })
    )
  }

  currentUserPostServiceApi(){
    let url = this.API_BASE_URL+'/secure/my-posts';
    return this.http.get<Posts[]>(url).pipe(
      catchError(err => {
        if(err.status == 401){
          this.snackBar.open(err.error.detail, 'Dismiss', {
            duration: 3000,
          })
        }
        return throwError(err);
      })
    )
  }

  userPostServiceApi(data){
    let url = this.API_BASE_URL+'/secure/user-posts';
    return this.http.post<Posts[]>(url, data).pipe(
      catchError(err => {
        if(err.status == 401){
          this.snackBar.open(err.error.detail, 'Dismiss', {
            duration: 3000,
          })
        }
        return throwError(err);
      })
    )
  }

  followUnfollowUserServiceApi(data){
    // get user data
    let url = this.API_BASE_URL+"/auth/follow-user";
    return this.http.post(url, data).pipe(
      catchError(err => {
          return throwError(err);
      })
    )
  }
  
}

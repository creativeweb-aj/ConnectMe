import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  createPostServiceApi(data){
    let url = this.API_BASE_URL+'/secure/create-post';
    return this.http.post(url, data).pipe(
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

  getPostDetail(postId){
    let url: string = this.API_BASE_URL+'/secure/post-detail';
    let data = {
      "postId": parseInt(postId)
    }
    return this.http.post(url, data).pipe(
      catchError(err => {
          if(err.status == 401){
            localStorage.removeItem('token')
            this.router.navigate(['/auth/login']);
          }
          return throwError(err);
        })
    )
  }


}

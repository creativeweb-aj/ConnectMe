import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Posts } from '../common/posts';

@Injectable({
  providedIn: 'root'
})
export class MainServicesService {

  API_BASE_URL = `${environment.API_BASE_URL}`;

  private data = new BehaviorSubject('');
  searchKey = this.data.asObservable();

  private userNameData = new BehaviorSubject('');
  userName = this.userNameData.asObservable();

  private userImageData = new BehaviorSubject('');
  userImage = this.userImageData.asObservable();

  // Header search show hide variable
  searchToggle: boolean = true;
  searchForm: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  searchPost(item: any) {
    this.data.next(item);
  }

  getUserNameService(item: any) {
    this.userNameData.next(item)
  }

  getUserImageService(item: any) {
    this.userImageData.next(item)
  }

  getToken(){  
    return !!localStorage.getItem("token");  
  }  

  logOutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/auth/login'])
  }

  isSearch(v){
    this.searchToggle = v;
  }

  isSearchEnableDisable(v){
    this.searchForm = v;
  }

  imageAcceptList = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG']

  checkImageFormat(name){
    var fileFormat = name.split('.');
    fileFormat = fileFormat.reverse();
    fileFormat = fileFormat[0]
    var isRight = false;
    if(this.imageAcceptList.indexOf(fileFormat) != -1){
      isRight = true
    }
    return isRight
  }

  userPostServiceApi(data){
    let url = this.API_BASE_URL+'/secure/posts';
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

  postLike(data){
    let url: string = this.API_BASE_URL+'/secure/like-dislike-post'
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

  postCommentServiceApi(data){
    let url: string = this.API_BASE_URL+'/secure/comment-post'
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


}

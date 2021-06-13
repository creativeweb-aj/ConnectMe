import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!request.url.includes('logout')){
      //this.loaderService.isLoader(true);
    }
    
    if(localStorage.getItem('token') != null){
      const token =  localStorage.getItem('token');
      const header = new HttpHeaders(
        {'Authorization': 'Token '+ token}
      );
      const AuthReq = request.clone({
        headers: header
      });
      return next.handle(AuthReq).pipe(
        finalize(() =>{
          //this.loaderService.isLoader(false);
        })
      );
    }else{
      return next.handle(request).pipe(
        finalize(() =>{
          //this.loaderService.isLoader(false);
        })
      );
    }
    
  }


}



import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  text = ''

  responseData = {
    status: '',
    response: '',
    message: ''
  }

  constructor(
    private authServices: AuthServiceService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  myParam: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.myParam = params['id']);
    this.verifyEmail();
  }


  verifyEmail(){
    var data = {
      "uuid": this.myParam
    }

    this.authServices.verifyEmailServiceApi(data)
    .pipe(
      catchError(err => {
        if(err.status == 409 || err.status == 410){
          this.text = err.error.message
          this.snackBar.open(err.error.message, 'Dismiss', {
            duration: 3000,
          });
        }
        return throwError(err);
      })
    )
    .subscribe((res: any) => {
      this.responseData = res;
      if(this.responseData.status == "SUCCESS"){
        this.text = this.responseData.message
        this.snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        });
      }
    })
  }

}

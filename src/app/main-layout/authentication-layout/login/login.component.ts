import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isDisable = false;

  hide = true;

  responseData = {
    status: '',
    response: {
      token: '',
      userId: ''
    },
    message: ''
  }

  logInForm = this.formBuilder.group({
    emailInput: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    passwordInput: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      ]
    ]
  })

  get emailData(){
    return this.logInForm.get('emailInput')
  }

  get passData(){
    return this.logInForm.get('passwordInput')
  }

  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
  
  isTrue: Boolean = false;

  ngOnInit(): void {
    
  }

  onSubmit(){
    if(!this.logInForm.valid){
      this.logInForm.markAllAsTouched;
      return false;
    }
    
    var data = {
      "email": this.emailData.value,
      "password": this.passData.value
    }
    this.isTrue = true;
    this.authServices.logInServiceApi(data)
    .pipe(
      catchError(err => {
        this.isTrue = false;
        
        return throwError(err);
      })
    )
    .subscribe((res: any) => {
      console.info(res)
      this.responseData = res;
      if(this.responseData.status == "SUCCESS"){
        localStorage.setItem('token', this.responseData.response.token);
        localStorage.setItem('userId', this.responseData.response.userId)
        this.snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
            this.router.navigate(['/home/posts']);
          });
      }
    })

  }

}

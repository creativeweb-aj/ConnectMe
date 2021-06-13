import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../service/auth-service.service';
import { CustomValidationService } from './validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;

  maxDate: Date;

  responseData = {
    status: '',
    response: {
      keyId: '',
      data: ''
    },
    message: ''
  }

  signUpForm = this.formBuilder.group({
    emailInput: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    firstNameInput: [
      '',
      Validators.required,
    ],
    lastNameInput: [
      '',
      Validators.required,
    ],
    dateofBirthInput: [
      '',
      Validators.required,
    ],
    passwordInput: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      ]
    ],
    confirmPasswordInput: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/),
      ]
    ]
  },
  {
    validator: this.customValidator.passwordMatchValidator(
      "passwordInput",
      "confirmPasswordInput"
    )
  });
  
  get emailData(){
    return this.signUpForm.get('emailInput')
  }

  get firstNameData(){
    return this.signUpForm.get('firstNameInput')
  }

  get lastNameData(){
    return this.signUpForm.get('lastNameInput')
  }

  get dobData(){
    return this.signUpForm.get('dateofBirthInput')
  }

  get passData() { 
    return this.signUpForm.get('passwordInput'); 
  }

  get confPassData() {
    return this.signUpForm.get("confirmPasswordInput");
  }


  constructor(
    private formBuilder: FormBuilder,
    private customValidator: CustomValidationService,
    private authServices: AuthServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { 
    // setting max date in date picker max date is minus 18 year from current year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const year = currentYear - 15;
    const day = currentDate.getDate()
    const month = currentDate.getMonth()+1
    const date = month+'/'+day+'/'+year
    this.maxDate = new Date(date);
  }

  isTrue: Boolean = false;

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.signUpForm.valid){
      this.signUpForm.markAllAsTouched;
      return false;
    }
    const date = this.dobData.value
    const dobTimeStamp = new Date(date).getTime();
    
    var data = {
      "first_name": this.firstNameData.value,
      "last_name": this.lastNameData.value,
      "date_of_birth": dobTimeStamp,
      "email": this.emailData.value,
      "password": this.passData.value,
      "password2": this.confPassData.value
    }
    // Disabled button
    this.isTrue = true;
    this.authServices.signUpServiceApi(data)
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
        this.snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/auth/login']);
      });
      }
    });

  }

}

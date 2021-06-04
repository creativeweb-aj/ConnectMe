import { Component, OnInit } from '@angular/core';
import { FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServicesService } from '../../main-services/main-services.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  userId = localStorage.getItem('userId');
  imgUrl = 'assets/images/upload.png';
  userProfile = '/assets/images/profilepic.png';

  // Profile data get and show api response
  responseData = {
    status: '',
    response: {
      biography: '',
      email: '',
      first_name: '',
      last_name: '',
      profile_picture: ''
    },
    messaage: ''
  }

  editProfileResponse = {
    status: '',
    data: {
      
    },
    message: ''
  }

  // list
  profileImageData: any;

  editProfileForm = this.formBuilder.group({
    firstNameInput: [
      '',
      [
        Validators.required
      ]
    ],
    lastNameInput: [
      '',
      [
        Validators.required
      ]
    ],
    bioInput: [
      '',
      [
        Validators.required,
        Validators.maxLength(250)
      ]
    ]
  })

  get firstNameData(){
    return this.editProfileForm.get('firstNameInput')
  }

  get lastNameData(){
    return this.editProfileForm.get('lastNameInput')
  }

  get bioData(){
    return this.editProfileForm.get('bioInput')
  }

  constructor(
    public mainServicesService: MainServicesService,
    private service: ServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.mainServicesService.isSearch(false);
    this.mainServicesService.isSearchEnableDisable(false);
    // Load profile data
    this.userProfileData();
  }

  imageChangedEvent: boolean = false ;

  imageError = false;

  uploadFile(file){
    if(file.target.files){
      this.profileImageData = file.target.files[0]
      const name = file.target.files[0].name;
      if(!this.mainServicesService.checkImageFormat(name)){
        this.imageError = true;
        return false;
      }else{
        this.imageError = false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload=(event:any)=>{
        this.userProfile = event.target.result;
        this.imageChangedEvent = true;
      }
    }
  }

  userProfileData(){
    this.service.currentUserProfileServiceApi().subscribe((res: any) => {
      this.responseData = res;
      if(this.responseData.status == "SUCCESS"){
        this.firstNameData.setValue(this.responseData.response.first_name)
        this.lastNameData.setValue(this.responseData.response.last_name)
        this.lastNameData.setValue(this.responseData.response.last_name)
        if(this.responseData.response.profile_picture != null){
          this.userProfile = this.responseData.response.profile_picture
        }
        this.bioData.setValue(this.responseData.response.biography)
      }
    })
  }

  onSubmit(){

    if(!this.editProfileForm.valid){
      this.editProfileForm.markAllAsTouched;
      return false;
    }

    if(this.imageError){
      return false
    }

    var formData = new FormData();

    formData.append('firstName', this.firstNameData.value)
    formData.append('lastName', this.lastNameData.value)
    if (this.imageChangedEvent){
      formData.append('profilePic', this.profileImageData)
      formData.append('profileChange', 'True')
    }else{
      formData.append('profileChange', 'False')
    }
    formData.append('bio', this.bioData.value)

    this.service.updateProfileServiceApi(formData).subscribe((res: any) => {
      console.info(res)
      this.editProfileResponse = res;
      if(this.editProfileResponse.status == "SUCCESS"){
        this.snackBar.open(this.editProfileResponse.message, 'Ok', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/home/profile']);
        });
      }
    })

  }

}

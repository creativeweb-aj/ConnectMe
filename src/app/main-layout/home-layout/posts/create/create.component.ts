import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServicesService } from '../../main-services/main-services.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  responseData = {
    status: '',
    response: {
      title: '',
      content: '',
      postImage: ''
    },
    message: ''
  }

  editProfileResponse = {
    status: '',
    data: {
      
    },
    message: ''
  }

  createPostForm = this.formBuilder.group({
    titleInput: [
      '',
      [
        Validators.required
      ]
    ],
    contentInput: [
      'Type here',
      [
        Validators.required
      ]
    ]
  })

  get titleData(){
    return this.createPostForm.get('titleInput')
  }

  get contentData(){
    return this.createPostForm.get('contentInput')
  }

  constructor(
    public mainServicesService: MainServicesService,
    private service: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.mainServicesService.isSearch(false);
    this.mainServicesService.isSearchEnableDisable(false);
  }
  
  imgUrl = 'assets/images/upload.png';
  userProfile = '/assets/images/profilepic.png';
  // list
  postImage: any;
  imageChangedEvent: boolean = false ;
  imageError = false;

  uploadFile(file){
    if(file.target.files){
      this.postImage = file.target.files[0]
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

  onSubmit(){
    if(!this.createPostForm.valid){
      this.createPostForm.markAllAsTouched
      return false
    }

    if(this.imageError){
      return false
    }

    let formData = new FormData();
    formData.append('title', this.titleData.value)
    formData.append('content', this.contentData.value)
    formData.append('postImage', this.postImage)

    this.service.createPostServiceApi(formData).subscribe((res: any)=>{
      this.responseData = res;
      console.info(this.responseData);
      if(this.responseData.status == "SUCCESS"){
        this.snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
            this.router.navigate(['/home/posts']);
        });
      }else{
        this.snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        });
      }
    })
  }

}

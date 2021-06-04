import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MainServicesService } from '../../main-services/main-services.service';
import { ServiceService } from '../../profile/service/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profileImage = 'assets/images/dummyprofile.png';
  userName = 'John Wick';

  responseData = {
    status: '',
    response: {
      biography: '',
      email: '',
      first_name: '',
      last_name: '',
      follower: '',
      following: '',
      posts: '',
      profile_picture: '',
      isFollow: ''
    },
    messaage: ''
  }


  searchForm = this.formBuilder.group({
    search: ['']
  })

  get searchData(){
    return this.searchForm.get('search');
  }

  constructor(
    public mainServicesService: MainServicesService,
    private formBuilder: FormBuilder,
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    this.mainServicesService.isSearch(true);
    this.getUserName();
    this.getUserImage();
    this.currentUserProfileData();
  }

  getUserName(){
    this.mainServicesService.userName.subscribe(data => {
      this.userName = data
    })
  }

  getUserImage(){
    this.mainServicesService.userImage.subscribe(data => {
      this.profileImage = data
    })
  }

  search(){
    var data = this.searchData.value
    this.mainServicesService.searchPost(data);
  }

  currentUserProfileData(){
    this.service.currentUserProfileServiceApi().subscribe((res: any) => {
      this.responseData = res;
      if(this.responseData.status == "SUCCESS"){
        let firstName = this.responseData.response.first_name != null ? this.responseData.response.first_name : ''
        let lastName = this.responseData.response.last_name != null ? this.responseData.response.last_name : ''
        this.userName =  firstName+' '+lastName ;
        if(this.responseData.response.profile_picture != null){
          this.profileImage = this.responseData.response.profile_picture;
        }
      }
    })
  }


}

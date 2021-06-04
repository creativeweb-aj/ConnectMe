import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MainServicesService } from '../main-services/main-services.service';
import { ServiceService } from './service/service.service';
import { Posts } from '../common/posts';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  PostsData: Posts[];

  userName = 'Dummy Name';
  userProfileImage = 'assets/images/dummyprofile.png';
  userPosts = '0';
  userFollower = '0';
  userFollowing = '0';
  userBio = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';
  currentUser: any = true;
  isFollow: any = false;

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

  responsePostLikeData = {
    status: '',
    response: {
      like: '',
      total: '',
      profile_picture: '',
      first_name: '',
      last_name: ''
    },
    message: ''
  };

  responseCommentData = {
    status: '',
    response: {
      child_comments: [],
      content: '',
      created_on: '',
      parent: '',
      post_id: '',
      user_id: ''
    },
    message: ''
  }

  responsePostData = {
    status: '',
    response: [],
    message: ''
  };

  commentForm = this.formBuilder.group({
    contentInput: [
      '',
      [
        Validators.required
      ]
    ]
  })

  get contentData(){
    return this.commentForm.get('contentInput')
  }

  constructor(
    public mainServicesService: MainServicesService,
    private service: ServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.mainServicesService.isSearch(true);
    this.mainServicesService.isSearchEnableDisable(false);

    // load profile data
    this.currentUserProfileData();
    this.loadCurrentUserPosts();
  }

  showComment: Boolean = false;
  commentToggle(id){
    this.showComment = id
  }

  convertInt(timestamp){
    return parseInt(timestamp) * 1000;
  }

  currentUserProfileData(){
    this.service.currentUserProfileServiceApi().subscribe((res: any) => {
      this.responseData = res;
      if(this.responseData.status == "SUCCESS"){
        this.isFollow = this.responseData.response.isFollow;
        let firstName = this.responseData.response.first_name != null ? this.responseData.response.first_name : ''
        let lastName = this.responseData.response.last_name != null ? this.responseData.response.last_name : ''
        this.userName =  firstName+' '+lastName ;
        if(this.responseData.response.profile_picture != null){
          this.userProfileImage = this.responseData.response.profile_picture;
        }
        this.userBio = this.responseData.response.biography;
        this.userFollower = this.responseData.response.follower;
        this.userFollowing = this.responseData.response.following;
        this.userPosts = this.responseData.response.posts;
        let name = this.userName
        this.mainServicesService.getUserNameService(name);
        this.mainServicesService.getUserImageService(this.responseData.response.profile_picture);
      }
    })
  }

  loadCurrentUserPosts(){
    this.service.currentUserPostServiceApi().subscribe((res: any) => {
      console.info(res);
      this.responsePostData = res;
      if(this.responsePostData.status == "SUCCESS"){
        this.PostsData = this.responsePostData.response;
      }
    })
  }


  likePost(postId){
    let data = {
      'postId': postId
    }
    this.mainServicesService.postLike(data).subscribe((res: any) => {
      this.responsePostLikeData = res;
      console.info(this.responsePostLikeData)
      if(this.responsePostLikeData.response.like){
        document.getElementById('like-'+postId).textContent = 'favorite';
        document.getElementById('count-'+postId).textContent = this.responsePostLikeData.response.total;
      }else{
        document.getElementById('like-'+postId).textContent = 'favorite_border';
        document.getElementById('count-'+postId).textContent = this.responsePostLikeData.response.total;
      }
    });
  }

  onSubmit(id){
    if(!this.commentForm.valid){
      this.commentForm.markAllAsTouched
      return false;
    }

    var data = {
      'postId': id,
      'content': this.contentData.value
    }
    this.mainServicesService.postCommentServiceApi(data).subscribe((res: any) => {
      this.responseCommentData = res;
      if(this.responseCommentData.status == "SUCCESS"){
        this.snackBar.open(this.responseCommentData.message, 'Ok', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
            this.loadCurrentUserPosts();
            this.commentForm.reset()
        });
      }else{
        this.snackBar.open(this.responseCommentData.message, 'Ok', {
          duration: 3000,
        });
      }
    })
  }

}

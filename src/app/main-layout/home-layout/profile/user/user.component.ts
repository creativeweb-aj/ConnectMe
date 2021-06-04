import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Posts } from '../../common/posts';
import { MainServicesService } from '../../main-services/main-services.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  PostsData: Posts[];

  userName = 'John Wick';
  userProfileImage = 'assets/images/dummyprofile.png';
  userPosts = '100';
  userFollower = '100k';
  userFollowing = '50';
  userBio = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';
  currentUser: any = false;
  isFollow: any = false;

  responseData = {
    status: '',
    response: {
      data: {
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
      currentUser: ''
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

  responseFollowData = {
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
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  myParam: string;

  ngOnInit(): void {
    this.mainServicesService.isSearch(true);
    this.mainServicesService.isSearchEnableDisable(false);

    this.route.params.subscribe((params: Params) => this.myParam = params['id']);
    // load profile data
    this.userProfileData();
    this.loadUserPosts();
  }

  showComment: Boolean = false;
  commentToggle(id){
    this.showComment = id
  }

  convertInt(timestamp){
    return parseInt(timestamp) * 1000;
  }

  userProfileData(){
    var data = {
      "userId": Number(this.myParam)
    }

    this.service.userProfileServiceApi(data).subscribe((res: any) => {
      
      this.responseData = res;
      if(this.responseData.status == "SUCCESS"){
        this.currentUser = this.responseData.response.currentUser;
        if(this.responseData.response.currentUser){
          this.router.navigate(['/home/profile']);
        }
        this.isFollow = this.responseData.response.data.isFollow;
        let firstName = this.responseData.response.data.first_name != null ? this.responseData.response.data.first_name : ''
        let lastName = this.responseData.response.data.last_name != null ? this.responseData.response.data.last_name : ''
        this.userName =  firstName+' '+lastName ;
        if(this.responseData.response.data.profile_picture != null){
          this.userProfileImage = this.responseData.response.data.profile_picture;
        }
        this.userBio = this.responseData.response.data.biography;
        this.userFollower = this.responseData.response.data.follower;
        this.userFollowing = this.responseData.response.data.following;
        this.userPosts = this.responseData.response.data.posts;
      }

    })
  }

  loadUserPosts(){
    var data = {
      'userId': this.myParam
    }
    this.service.userPostServiceApi(data).subscribe((res: any) => {
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

  followUser(){
    let data = {
      'userId': this.myParam
    }
    this.service.followUnfollowUserServiceApi(data).subscribe((res: any) => {
      this.responseFollowData = res;
      if(this.responseFollowData.status == 'SUCCESS'){
        this.userFollower = this.responseFollowData.response.follower;
        this.userFollowing = this.responseFollowData.response.following;
        this.isFollow = this.responseFollowData.response.isFollow;
      }
    })
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
            this.loadUserPosts();
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

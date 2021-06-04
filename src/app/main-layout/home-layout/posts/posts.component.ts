import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Posts } from '../common/posts';
import { MainServicesService } from '../main-services/main-services.service';
import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  PostsData: Posts[];

  responsePostData = {
    status: '',
    response: [],
    message: ''
  };

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

  showComment: Boolean = false;

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
    this.mainServicesService.isSearchEnableDisable(true);
    this.getSearchData();
  }

  getSearchData(){
    this.mainServicesService.searchKey.subscribe(data => {
      this.loadUserPosts(data);
    })
  }

  convertInt(timestamp){
    return parseInt(timestamp) * 1000;
  }

  commentToggle(){
    if(this.showComment){
      this.showComment = false;
    }else{
      this.showComment = true;
    }
  }

  loadUserPosts(value){
    var data = {
      'search': value
    }
    this.mainServicesService.userPostServiceApi(data).subscribe((res: any) => {
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
            this.loadUserPosts('');
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

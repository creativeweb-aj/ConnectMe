import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { MainServicesService } from '../../main-services/main-services.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  result = {
    status: '',
    response: {
        id: '',
        title: '',
        content: '',
        post_image: '',
        likes: '',
        total_comments: '',
        liked_by: [],
        isLiked: '',
        created_on: '',
        created_by: {
          id: '',
          profile_picture: '',
          first_name: '',
          last_name: ''
        },
        comment: [{
          child_comments: [],
          content: '',
          created_on: '',
          parent: '',
          post_id: '',
          user_id: {
            id: '',
            first_name: '',
            last_name: '',
            profile_picture: ''
          }
        }]
    },
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
    this.postDetailView();
  }

  convertInt(timestamp){
    return parseInt(timestamp) * 1000;
  }

  myParam: string;
  postDetailView(){
    // get param user id
    this.route.params.subscribe((params: Params) => this.myParam = params['id']);
    this.service.getPostDetail(this.myParam).subscribe((res: any) => {
      this.result = res;
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
            this.postDetailView();
        });
      }else{
        this.snackBar.open(this.responseCommentData.message, 'Ok', {
          duration: 3000,
        });
      }
    })
  }


}

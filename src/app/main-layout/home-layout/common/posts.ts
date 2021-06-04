export class Posts {
    id: string;
    title: string;
    content: string;
    post_image: string;
    hash_tag: string;
    likes: string;
    total_comments: string;
    liked_by: [{
        first_name: string,
        last_name: string,
        email: string;
    }]
    isLiked: boolean;
    created_on: string;
    created_by: {
        id: '',
        profile_picture: '',
        first_name: '',
        last_name: ''
    }
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
}
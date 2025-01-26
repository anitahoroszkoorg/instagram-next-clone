export interface Like {
  like_id: string;
  user_id: string;
  user: {
    username: string;
  };
}

export interface Comment {
  comment_text: string;
  comment_id: string;
  created_at: string;
  user_id: string;
  user: {
    username: string;
  };
}

export interface PostDetails {
  caption: string;
  created_at: string;
  image: string;
  post_id: string;
  user_id: string;
  likes: Like[];
  comments: Comment[];
  user: {
    username: string;
  };
}

export interface Post {
  posts: PostDetails[];
}

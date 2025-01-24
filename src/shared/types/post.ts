export interface PostDetails {
  caption: string;
  created_at: string;
  image: string;
  post_id: string;
  user_id: string;
}
export interface Post {
  posts: PostDetails[];
}

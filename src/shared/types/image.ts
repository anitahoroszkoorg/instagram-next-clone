export interface ImageDetails {
  imageUrl: string | undefined;
  caption?: string;
  tags?: string[];
  userId: number;
  createdAt: string;
  postId: number;
}

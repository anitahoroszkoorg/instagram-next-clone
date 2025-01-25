"use client";
import React, { useState } from "react";
import {
  PhotoboxFrame,
  PhotoDetails,
  PhotoDescription,
  LikeSection,
  CommentsSection,
  CommentItem,
  CommentsInputContainer,
  Avatar,
  Photo,
  Username,
  Input,
  Button,
  Caption,
} from "./styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { PostDetails } from "@/shared/types/post";
import { fetchData } from "@/lib/fetchData";

interface ImageComponentProps {
  postDetails: PostDetails | null;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  postDetails,
}) => {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  if (!postDetails) return null;

  const { image, caption, post_id } = postDetails;

  const likePost = async (post_id: string) => {
    try {
      const response = await fetchData("/api/like", "POST", { post_id });
      setIsLiked(true);
      if (response.status !== 200) {
        toast.error("Unable to like");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments((prevComments) => [...prevComments, newComment.trim()]);
      setNewComment("");
    }
  };

  const unlike = async (post_id: string) => {
    try {
      const response = await fetchData("/api/like", "DELETE", { post_id });
      setIsLiked(false);
      console.log(response);
      if (response.status !== 200) {
        toast.error("Unable to unlike");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async (post_id: string) => {
    try {
      const response = await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify({
          post_id: post_id,
          comment: newComment,
        }),
      });
    } catch (error) {
      console.error(error);
      toast;
    }
  };

  return (
    <>
      <ToastContainer />
      <PhotoboxFrame>
        <Photo src={image} alt={caption || "Image"} />
        <PhotoDetails>
          <PhotoDescription>
            <Link href={`/profile/${"username"}`}>
              <Avatar src={image} />
              <Username>{"username"}</Username>
            </Link>
            <Caption>{caption}</Caption>
          </PhotoDescription>
          <LikeSection>
            {isLiked ? (
              <FavoriteIcon
                onClick={() => unlike(post_id)}
                style={{ color: "red", cursor: "pointer" }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => likePost(post_id)}
                style={{ cursor: "pointer" }}
              />
            )}
            <span>
              {likes} {likes === 1 ? "like" : "likes"}
            </span>
          </LikeSection>
          <CommentsSection>
            {comments.length > 0 &&
              comments.map((comment, index) => (
                <CommentItem key={index}>{comment}</CommentItem>
              ))}
            <CommentsInputContainer>
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button onClick={handleAddComment}>publish</Button>
            </CommentsInputContainer>
          </CommentsSection>
        </PhotoDetails>
      </PhotoboxFrame>
    </>
  );
};

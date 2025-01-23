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
} from "./styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ImageDetails } from "@/shared/types/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

interface ImageComponentProps {
  imageDetails: ImageDetails | null;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  imageDetails,
}) => {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  if (!imageDetails) return null;

  const handleLikeToggle = async () => {
    if (!isLiked) {
      try {
        await likePost();
        setIsLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
      } catch (error) {
        console.error("Failed to like the post:", error);
      }
    } else {
      setIsLiked(false);
      setLikes((prevLikes) => prevLikes - 1);
    }
  };

  const likePost = async () => {
    try {
      const response = await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify({
          post_id: imageDetails?.post_id,
          user_id: imageDetails?.user_id,
        }),
      });
      if (!response.ok) {
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

  return (
    <>
      <ToastContainer />
      <PhotoboxFrame>
        <Photo src={imageDetails.image} alt={imageDetails.caption || "Image"} />
        <PhotoDetails>
          <PhotoDescription>
            <Link href="/userid/profile">
              <Avatar src={imageDetails.image} />
            </Link>
          </PhotoDescription>
          <Username>username</Username>
          <LikeSection>
            {isLiked ? (
              <FavoriteIcon
                onClick={handleLikeToggle}
                style={{ color: "red", cursor: "pointer" }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={handleLikeToggle}
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

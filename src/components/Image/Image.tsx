"use client";
import React, { useEffect, useState } from "react";
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
import { Like, PostDetails, Comment } from "@/shared/types/post";
import { fetchData } from "@/lib/fetchData";
import { useUser } from "@/lib/hooks/userContext";
import { formatDate } from "@/app/utils/formatDate";

interface ImageComponentProps {
  postDetails: PostDetails | null;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  postDetails,
}) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [currentComments, setComments] = useState<Comment[]>([]);
  const [currentLikes, setLikes] = useState<number>(0);

  if (!postDetails) return null;

  const { image, caption, post_id, comments, likes } = postDetails;

  useEffect(() => {
    setComments(comments);
    setLikes(likes?.length || 0);
    if (likes && user) {
      const userHasLiked = likes.some(
        (like: Like) => like.user_id === user.user_id,
      );
      setIsLiked(userHasLiked);
    }
  }, [comments, likes, user]);

  const refreshLikes = async () => {
    try {
      const response = await fetchData(`/api/post/${post_id}`, "GET");
      const responseData = response.data as { likes: Like[] };
      if (response.status === 200 && responseData.likes) {
        setLikes(responseData.likes.length);
      } else {
        console.error("Failed to fetch likes: Invalid response structure");
      }
    } catch (error) {
      console.error("Failed to refresh likes:", error);
    }
  };

  const likePost = async () => {
    setIsLiked(true);
    setLikes((prev) => prev + 1);
    try {
      const response = await fetchData("/api/like", "POST", { post_id });
      if (response.status !== 200) {
        toast.error("Unable to like");
        setIsLiked(false);
        setLikes((prev) => prev - 1);
      } else {
        refreshLikes();
      }
    } catch (error) {
      console.error(error);
      setIsLiked(false);
      setLikes((prev) => prev - 1);
    }
  };

  const unlike = async () => {
    setIsLiked(false);
    setLikes((prev) => prev - 1);
    try {
      const response = await fetchData("/api/like", "DELETE", { post_id });
      if (response.status !== 200) {
        toast.error("Unable to unlike");
        setIsLiked(true);
        setLikes((prev) => prev + 1);
      } else {
        refreshLikes();
      }
    } catch (error) {
      console.error(error);
      setIsLiked(true);
      setLikes((prev) => prev + 1);
    }
  };
  const refreshComments = async () => {
    try {
      const response = await fetchData(`/api/post/${post_id}`, "GET");
      const responseData = response.data as { comments: Comment[] };
      if (response.status === 200 && responseData.comments) {
        setComments(responseData.comments);
      } else {
        console.error("Failed to fetch comments: Invalid response structure");
      }
    } catch (error) {
      console.error("Failed to refresh comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (user) {
      if (!newComment.trim()) return;
      const optimisticComment: Comment = {
        comment_text: newComment,
        comment_id: Math.random().toString(36).substring(7),
        created_at: new Date().toISOString(),
        user_id: user.user_id,
        user: { username: user.username },
      };
      setComments((prevComments) => [optimisticComment, ...prevComments]);
      setNewComment("");
      try {
        const response = await fetchData("/api/comment", "POST", {
          post_id,
          comment_text: newComment,
        });
        if (response.status !== 200) {
          toast.error("Failed to add comment.");
          setComments((prevComments) =>
            prevComments.filter(
              (comment) => comment.comment_id !== optimisticComment.comment_id,
            ),
          );
        } else {
          refreshComments();
        }
      } catch (error) {
        console.error("Error adding comment:", error);
        setComments((prevComments) =>
          prevComments.filter(
            (comment) => comment.comment_id !== optimisticComment.comment_id,
          ),
        );
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <PhotoboxFrame>
        <Photo src={image} alt={caption || "Image"} />
        <PhotoDetails>
          <PhotoDescription>
            <Link
              href={`/profile/${postDetails.user.username}/${postDetails.user_id}`}
            >
              <Avatar src={image} />
              <Username>{postDetails.user.username}</Username>
            </Link>
            <Caption>{caption}</Caption>
          </PhotoDescription>
          <LikeSection>
            {isLiked ? (
              <FavoriteIcon
                onClick={unlike}
                style={{ color: "red", cursor: "pointer" }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={likePost}
                style={{ cursor: "pointer" }}
              />
            )}
            <span>
              {currentLikes} {currentLikes === 1 ? "like" : "likes"}
            </span>
          </LikeSection>
          <CommentsSection>
            {currentComments.map((comment) => (
              <CommentItem key={comment.comment_id}>
                <p>{comment.user.username}</p>
                <p>{comment.comment_text}</p>
                <p>{formatDate(comment.created_at)}</p>
              </CommentItem>
            ))}
            <CommentsInputContainer>
              <Input
                required
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button disabled={!newComment} onClick={handleAddComment}>
                publish
              </Button>
            </CommentsInputContainer>
          </CommentsSection>
        </PhotoDetails>
      </PhotoboxFrame>
    </>
  );
};

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

  useEffect(() => {
    if (postDetails) {
      const { comments, likes } = postDetails;
      setComments(comments);
      setLikes(likes?.length || 0);

      if (likes && user) {
        const userHasLiked = likes.some(
          (like: Like) => like.user_id === user.user_id,
        );
        setIsLiked(userHasLiked);
      }
    }
  }, [postDetails, user]);

  const refreshLikes = async () => {
    if (!postDetails) return;
    try {
      const response = await fetchData(
        "/api/getAllImagesByFollowedUsers",
        "GET",
      );
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
    if (!postDetails) return;
    setIsLiked(true);
    setLikes((prev) => prev + 1);
    try {
      const response = await fetchData("/api/like", "POST", {
        post_id: postDetails.post_id,
      });
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
    if (!postDetails) return;
    setIsLiked(false);
    setLikes((prev) => prev - 1);
    try {
      const response = await fetchData("/api/like", "DELETE", {
        post_id: postDetails.post_id,
      });
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
    if (!postDetails) return;
    try {
      const response = await fetchData(
        "/api/getAllImagesByFollowedUsers",
        "GET",
      );
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
    if (!user || !postDetails) return;
    if (!newComment.trim()) return;
    const optimisticComment: Comment = {
      comment_text: newComment,
      created_at: new Date().toISOString(),
      user_id: user.user_id,
      user: { username: user.username },
    };
    setComments((prevComments) => [optimisticComment, ...prevComments]);
    setNewComment("");
    try {
      const response = await fetchData("/api/comment", "POST", {
        post_id: postDetails.post_id,
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
  };

  if (!postDetails) return null;

  return (
    <>
      <ToastContainer />
      <PhotoboxFrame>
        <Photo src={postDetails.image} alt={postDetails.caption || "Image"} />
        <PhotoDetails>
          <PhotoDescription>
            <Link
              href={`/profile/${postDetails.user.username}/${postDetails.user_id}`}
            >
              <Avatar src={postDetails.image} />
              <Username>{postDetails.user.username}</Username>
            </Link>
            <Caption>{postDetails.caption}</Caption>
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

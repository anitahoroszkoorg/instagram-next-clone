"use client";
import React, { useEffect, useState } from "react";
import {
  PhotoboxFrame,
  Section,
  CommentsSection,
  CommentItem,
  CommentsInputContainer,
  Avatar,
  Username,
  Input,
  Button,
  Caption,
  MaskedImage,
  MaskContainer,
  UserDetails,
} from "./styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { Like, PostDetails, Comment } from "@/shared/types/post";
import { fetchData } from "@/app/lib/fetchData";
import { useUser } from "@/app/lib/hooks/userContext";
import { formatDate } from "@/app/utils/formatDate";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { StyledButton } from "@/shared/styled/styled";

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
  const [expandedComments, setExpandedComments] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (postDetails) {
      setComments(postDetails.comments);
      setLikes(postDetails.likes?.length || 0);
      if (postDetails.likes && user) {
        const userHasLiked = postDetails.likes.some(
          (like: Like) => like.user_id === user.user_id,
        );
        setIsLiked(userHasLiked);
      }
    }
  }, [postDetails, user]);

  const toggleExpand = (commentId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
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
      const response = await fetchData("/api/images", "GET");
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
      comment_id: Math.random().toString(),
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

  const handleDeleteComment = async (id: string | undefined) => {
    try {
      if (!id) return;
      const response = await fetchData(`/api/comment/`, "DELETE", {
        comment_id: id,
      });
      if (response.status !== 200) {
        toast.error("Unable to delete comment. Please try again later.");
      } else {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== id),
        );
      }
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  if (!postDetails) return null;

  return (
    <>
      <ToastContainer />
      <PhotoboxFrame>
        <Section>
          <Link href={`/profile/${postDetails.user_id}`}>
            <UserDetails>
              <Avatar src={postDetails.image} />
              <Username>{postDetails.user.username}</Username>
            </UserDetails>
          </Link>
        </Section>
        <MaskContainer>
          <MaskedImage src={postDetails.image} alt="Masked" />
        </MaskContainer>
        <Section>
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
        </Section>
        <Section>
          <Username>{postDetails.user.username}:</Username>
          <Caption>{postDetails.caption}</Caption>
        </Section>
        <CommentsSection>
          {currentComments.map((comment) => {
            const isExpanded = expandedComments[comment.comment_id as string];
            const isLong = comment.comment_text.length > 50;
            const displayedText = isExpanded
              ? comment.comment_text
              : comment.comment_text.slice(0, 50) + (isLong ? "..." : "");
            return (
              <CommentItem key={comment.comment_id}>
                <p>{comment.user.username}</p>
                <p>
                  {displayedText}{" "}
                  {isLong && (
                    <span
                      onClick={() => toggleExpand(comment.comment_id as string)}
                      className="see-more"
                    >
                      {isExpanded ? "See less" : "See more"}
                    </span>
                  )}
                </p>
                <p>{formatDate(comment.created_at)}</p>
                {comment.user_id === user?.user_id && (
                  <Button
                    onClick={() =>
                      handleDeleteComment(comment.comment_id as string)
                    }
                  >
                    <DeleteOutlineIcon
                      style={{ color: "grey", padding: "0.2em" }}
                    />
                  </Button>
                )}
              </CommentItem>
            );
          })}
        </CommentsSection>
        <CommentsInputContainer>
          <Input
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <StyledButton disabled={!newComment} onClick={handleAddComment}>
            Add
          </StyledButton>
        </CommentsInputContainer>
      </PhotoboxFrame>
    </>
  );
};

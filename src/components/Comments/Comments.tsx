import React, { useState } from "react";
import { Comment } from "@/shared/types/post";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { fetchData } from "@/app/utils/fetchData";
import { StyledButton, Username } from "@/shared/styled/styled";
import { useUser } from "@/app/hooks/userContext";
import { toast } from "react-toastify";
import { formatDate } from "@/app/utils/formatDate";
import Link from "next/link";
import {
  CommentsSection,
  CommentItem,
  Caption,
  CommentsInputContainer,
  Button,
  Input,
} from "./styled";

interface CommentsProps {
  comments: Comment[];
  postId: string;
}

const Comments: React.FC<CommentsProps> = (comments, postId) => {
  const [newComment, setNewComment] = useState<string>("");
  const [currentComments, setComments] = useState<Comment[]>([]);
  const { user } = useUser();
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    if (user) {
      const optimisticComment: Comment = {
        comment_id: Math.random().toString(),
        comment_text: newComment,
        created_at: new Date().toISOString(),
        user_id: user?.user_id,
        user: { username: user?.username },
      };
      setComments((prev) => [optimisticComment, ...prev]);
      setNewComment("");
      try {
        await fetchData("/api/comment", "POST", {
          post_id: postId,
          comment_text: newComment,
        });
      } catch {
        setComments((prev) =>
          prev.filter(
            (comment) => comment.comment_id !== optimisticComment.comment_id,
          ),
        );
        toast.error("Failed to add comment");
      }
    }
  };

  const handleDeleteComment = async (id: string | undefined) => {
    if (!id) return;
    try {
      await fetchData("/api/comment", "DELETE", { comment_id: id });
      setComments((prev) =>
        prev.filter((comment) => comment.comment_id !== id),
      );
    } catch {
      toast.error("Unable to delete comment");
    }
  };

  return (
    <>
      <CommentsSection>
        {comments.comments.map((comment) => (
          <CommentItem key={comment.comment_id}>
            <Link href={`/profile/${comment.user_id}`}>
              <Username>{comment.user.username}:</Username>
            </Link>
            <Caption>{comment.comment_text}</Caption>
            <p>{formatDate(comment.created_at)}</p>
            {comment.user_id === user?.user_id && (
              <Button onClick={() => handleDeleteComment(comment.comment_id)}>
                <DeleteOutlineIcon
                  style={{ color: "grey", padding: "0.2em" }}
                />
              </Button>
            )}
          </CommentItem>
        ))}
      </CommentsSection>
      <CommentsInputContainer>
        <Input
          required
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <StyledButton disabled={!newComment.trim()} onClick={handleAddComment}>
          Add
        </StyledButton>
      </CommentsInputContainer>
    </>
  );
};

export default Comments;

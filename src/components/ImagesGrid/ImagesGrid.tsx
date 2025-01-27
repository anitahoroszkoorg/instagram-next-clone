"use client";
import { Post } from "@/shared/types/post";
import { ImageComponent } from "../Image/Image";
import { FeedWrapper } from "./styled";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "@/lib/hooks/useFetch";

export const ImagesGrid: React.FC = () => {
  const { data, loading, error } = useFetch<Post>(
    "/api/getAllImagesByFollowedUsers",
  );

  if (loading) return <p>Loading...</p>;
  if (error) return toast.error(error.message);

  return (
    <FeedWrapper>
      <ToastContainer />
      {!!data && data.posts.length > 0 ? (
        data.posts.map((postDetails) => (
          <div key={postDetails.post_id}>
            <ImageComponent postDetails={postDetails} />
          </div>
        ))
      ) : (
        <p>No images found</p>
      )}
    </FeedWrapper>
  );
};

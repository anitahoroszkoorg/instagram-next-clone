"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, Photobox } from "./styled";
import useFetch from "@/app/hooks/useFetch";
import { Post, PostDetails } from "@/shared/types/post";
import { UserDetails } from "@/shared/types/user";
import { ImageModal } from "../ImageModal/ImageModal";

interface ImageGridProps {
  id: string;
  userDetails: UserDetails;
  setPostsLength: (length: number) => void;
  isProfileOwner: boolean;
}

export const ImagesGrid: React.FC<ImageGridProps> = ({
  id,
  userDetails,
  setPostsLength,
  isProfileOwner,
}) => {
  const { data, loading, error } = useFetch<Post>(`/api/images/${id}`);

  useEffect(() => {
    setPostsLength(data?.posts?.length ?? 0);
  }, [data]);

  const [selectedImage, setSelectedImage] = useState<PostDetails | null>(null);

  return (
    <>
      <FeedWrapper>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!!data && data.posts.length > 0
          ? data.posts.map((image) => (
              <Photobox
                key={image.post_id}
                src={image.image}
                alt="photo"
                onClick={() => setSelectedImage(image)}
              />
            ))
          : !loading && <p>No posts available</p>}
      </FeedWrapper>
      {selectedImage && (
        <ImageModal
          id={selectedImage.post_id}
          isProfileOwner={isProfileOwner}
          onClose={() => setSelectedImage(null)}
          isEditable={isProfileOwner}
        />
      )}
    </>
  );
};

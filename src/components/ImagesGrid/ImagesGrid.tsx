"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, ImgWrapper } from "./styled";
import useFetch from "@/app/hooks/useFetch";
import { Post, PostDetails } from "@/shared/types/post";
import { ImageModal } from "../ImageModal/ImageModal";
import Image from "next/image";

interface ImageGridProps {
  id: string;
  setPostsLength: (length: number) => void;
  isProfileOwner: boolean;
}

export const ImagesGrid: React.FC<ImageGridProps> = ({
  id,
  setPostsLength,
  isProfileOwner,
}) => {
  const { data, loading, error } = useFetch<Post>(`/api/images/${id}`);

  useEffect(() => {
    if (data) {
      setPostsLength(data.posts?.length ?? 0);
    }
  }, [data?.posts, setPostsLength]);

  const [selectedImage, setSelectedImage] = useState<PostDetails | null>(null);

  return (
    <>
      <FeedWrapper>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!!data && data.posts.length > 0
          ? data.posts.map((image) => (
              <ImgWrapper>
                <Image
                  src={image.image}
                  alt="Post"
                  width={300}
                  height={300}
                  priority
                  style={{ width: "100%", height: "auto" }}
                  key={image.post_id}
                  onClick={() => setSelectedImage(image)}
                />
              </ImgWrapper>
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

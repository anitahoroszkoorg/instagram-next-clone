"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, ImgWrapper } from "./styled";
import { ImageModal } from "../ImageModal/ImageModal";
import Image from "next/image";
import { fetchPostDetails } from "@/app/utils/fetchPosts";
import { useQuery } from "@tanstack/react-query";
import { PostDetails } from "@/shared/types/post";

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
  const { data, error, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetails(id),
    staleTime: 1000,
  });
  useEffect(() => {
    if (data) {
      setPostsLength(data.posts?.length ?? 0);
    }
  }, [data?.posts, setPostsLength]);

  const [selectedImage, setSelectedImage] = useState<PostDetails | null>(null);

  return (
    <>
      <FeedWrapper>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!!data && data.posts.length > 0
          ? data.posts.map((image: PostDetails) => (
              <ImgWrapper key={image.post_id}>
                {image.image ? (
                  <Image
                    src={image.image}
                    alt="Post"
                    width={300}
                    height={300}
                    priority
                    style={{ width: "100%", height: "auto" }}
                    onClick={() => setSelectedImage(image)}
                  />
                ) : (
                  <p>Image cannot be viewed.</p>
                )}
              </ImgWrapper>
            ))
          : !isLoading && <p>No posts available</p>}
      </FeedWrapper>
      {selectedImage && (
        <ImageModal
          key={selectedImage.post_id}
          id={selectedImage.post_id}
          isProfileOwner={isProfileOwner}
          onClose={() => setSelectedImage(null)}
          isEditable={isProfileOwner}
        />
      )}
    </>
  );
};

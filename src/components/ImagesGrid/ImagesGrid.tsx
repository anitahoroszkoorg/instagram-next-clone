"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, ImgWrapper, Skeleton } from "./styled";
import { ImageModal } from "../ImageModal/ImageModal";
import Image from "next/image";
import { fetchUsersPosts } from "@/app/utils/fetchPosts";
import { useQuery } from "@tanstack/react-query";
import { PostDetails } from "@/shared/types/post";
import ErrorPage from "../ErrorPage.ts/ErrorPage";

interface ImageGridProps {
  id: string;
  setPostsLength: (length: number) => void;
}

export const ImagesGrid: React.FC<ImageGridProps> = ({
  id,
  setPostsLength,
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchUsersPosts(id),
    staleTime: 1000,
  });

  useEffect(() => {
    if (data) {
      setPostsLength(data.posts?.length ?? 0);
    }
  }, [data, setPostsLength]);

  const [selectedImage, setSelectedImage] = useState<PostDetails | null>(null);

  if (error) return <ErrorPage />;

  return (
    <>
      <FeedWrapper>
        {isLoading && (
          <>
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} data-testid="skeleton" />
            ))}
          </>
        )}
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
          : !isLoading && <p>No posts yet!</p>}
      </FeedWrapper>
      {selectedImage && (
        <ImageModal
          key={selectedImage.post_id}
          postId={selectedImage.post_id}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, Photobox } from "./styled";
import useFetch from "@/app/lib/hooks/useFetch";
import { Post } from "@/shared/types/post";

interface ImageGridProps {
  id: string;
}

export const ImagesGrid: React.FC<ImageGridProps> = ({ id }) => {
  const { data, loading, error } = useFetch<Post>(`/api/images/${id}`);
  console.log(data?.posts);
  return (
    <>
      <FeedWrapper>
        {!!data && data.posts.length > 0 ? (
          data.posts.map((image) => <Photobox src={image.image} alt="photo" />)
        ) : (
          <></>
        )}
      </FeedWrapper>
    </>
  );
};

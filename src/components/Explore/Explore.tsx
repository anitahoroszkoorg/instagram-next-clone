"use client";
import useFetch from "@/app/lib/hooks/useFetch";
import { PostDetails } from "@/shared/types/post";
import { useState } from "react";
import {
  FeedWrapper,
  Photobox,
  ContentContainer,
  SearchContainer,
  ExploreContainer,
} from "./styled";

export const Explore = () => {
  const { data, loading, error } = useFetch<{ posts: PostDetails[] }>(
    "/api/post",
  );
  const [selectedImage, setSelectedImage] = useState<PostDetails | null>(null);

  return (
    <>
      <ExploreContainer>
        <SearchContainer></SearchContainer>
        <ContentContainer>
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
        </ContentContainer>
      </ExploreContainer>
    </>
  );
};

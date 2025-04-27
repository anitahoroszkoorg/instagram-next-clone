"use client";
import useFetch from "@/app/hooks/useFetch";
import { PostDetails } from "@/shared/types/post";
import { useState } from "react";
import {
  FeedWrapper,
  SearchContainer,
  ExploreContainer,
  ContentContainer,
} from "./styled";
import { ImageModal } from "../ImageModal/ImageModal";
import { SearchBar } from "../Searchbar/Searchbar";
import { ImgWrapper } from "./styled";
import Image from "next/image";

export const Explore = () => {
  const { data, loading, error } = useFetch<{ posts: PostDetails[] }>(
    "/api/post",
  );
  const [selectedImage, setSelectedImage] = useState<PostDetails | null>(null);

  return (
    <>
      <ExploreContainer>
        <SearchContainer>
          <SearchBar />
        </SearchContainer>
        <ContentContainer>
          <FeedWrapper>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!!data && data.posts.length > 0
              ? data.posts.map((image) => (
                  <ImgWrapper key={image.post_id}>
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
        </ContentContainer>
      </ExploreContainer>
      {selectedImage && (
        <ImageModal
          id={selectedImage.post_id}
          isEditable={false}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

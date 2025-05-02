"use client";
import { PostDetails } from "@/shared/types/post";
import { useState } from "react";
import {
  FeedWrapper,
  SearchContainer,
  ExploreContainer,
  ContentContainer,
  ImgWrapper,
} from "./styled";
import { ImageModal } from "../ImageModal/ImageModal";
import { SearchBar } from "../Searchbar/Searchbar";
import Image from "next/image";
import { fetchAllPublicPosts } from "@/app/utils/fetchPosts";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../ErrorPage.ts/ErrorPage";
import { Skeleton } from "../ImagesGrid/styled";
import { useSession } from "next-auth/react";

export const Explore = () => {
  const { data: session } = useSession();
  const isLoggedIn = session?.user;
  const { data, error, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () => fetchAllPublicPosts(),
    staleTime: 1000,
  });

  const [selectedImage, setSelectedImage] = useState<PostDetails | null>(null);

  if (error) return <ErrorPage />;
  return !isLoggedIn ? (
    <></>
  ) : (
    <>
      <ExploreContainer>
        <SearchContainer>
          <SearchBar />
        </SearchContainer>
        <ContentContainer>
          <FeedWrapper>
            {isLoading && (
              <>
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} data-testid="skeleton" />
                ))}
              </>
            )}
            {!!data && data.posts.length > 0
              ? data.posts.map((image: PostDetails) => (
                  <ImgWrapper key={image.post_id}>
                    <Image
                      src={image.image}
                      alt="Post"
                      width={300}
                      height={300}
                      priority
                      style={{ width: "100%", height: "auto" }}
                      onClick={() => setSelectedImage(image)}
                    />
                  </ImgWrapper>
                ))
              : !isLoading && <p>No posts available</p>}
          </FeedWrapper>
        </ContentContainer>
      </ExploreContainer>
      {selectedImage && (
        <ImageModal
          postId={selectedImage.post_id}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

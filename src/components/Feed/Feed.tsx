"use client";
import { ImageComponent } from "../Image/Image";
import { FeedWrapper, RefContainer } from "./styled";
import { ToastContainer } from "react-toastify";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { StyledButton } from "@/shared/styled/styled";
import { fetchPostIds } from "@/app/utils/fetchPosts";

export const Feed: React.FC = () => {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: fetchPostIds,
    staleTime: 10000,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  return (
    <FeedWrapper>
      <ToastContainer />
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : (
        <>
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.map((postId: string) => (
                <div key={postId}>
                  <ImageComponent postId={postId} />
                </div>
              ))}
            </div>
          ))}
          <RefContainer ref={ref}>
            <StyledButton
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading older posts..."
                : hasNextPage
                  ? "Load More"
                  : "No older posts."}
            </StyledButton>
          </RefContainer>
        </>
      )}
    </FeedWrapper>
  );
};

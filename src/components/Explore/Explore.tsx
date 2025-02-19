import useFetch from "@/app/lib/hooks/useFetch";
import { PostDetails } from "@/shared/types/post";
import { useState } from "react";
import { FeedWrapper, Photobox } from "./styled";

export const Explore = () => {
  const { data, loading, error } = useFetch<{ posts: PostDetails[] }>(
    "/api/post",
  );
  console.log("Data from API:", data);
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
    </>
  );
};

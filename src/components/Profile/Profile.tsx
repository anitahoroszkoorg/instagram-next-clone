"use client";
import { useEffect, useState } from "react";
import { ContentContainer, InfoContainer, ProfileContainer } from "./styled";
import { ImagesGrid } from "../ImagesGrid/ImagesGrid";
import FollowList from "./FollowList/Followlist";
import useFetch from "@/app/hooks/useFetch";
import { useUser } from "@/app/hooks/userContext";
import { UserDetails } from "@/shared/types/user";
import { User } from "@/globals";
import ProfileInfo from "./ProfileInformation/ProfileInformation";

interface UserDetailsResponse {
  userDetails: UserDetails;
  message: string;
}

interface ProfileComponentProps {
  slug: string;
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({ slug }) => {
  const [activeTab, setActiveTab] = useState<
    "followers" | "followed" | "posts"
  >("posts");
  const [postsLength, setPostsLength] = useState(0);
  const [followersAmount, setFollowersAmount] = useState<number>(0);
  const [followedAmount, setFollowedAmount] = useState<number>(0);

  const { data, loading, error } = useFetch<UserDetailsResponse>(
    `/api/user/${slug}`,
  );
  const { user } = useUser();
  const userDetails = data?.userDetails;
  const isProfileOwner = user?.user_id === userDetails?.user_id;

  const {
    data: followData,
    loading: followLoading,
    error: followError,
  } = useFetch<{ followers: User[]; following: User[] }>(
    `/api/followers/${slug}`,
  );

  useEffect(() => {
    if (followData) {
      setFollowersAmount(
        Array.isArray(followData.followers) ? followData.followers.length : 0,
      );
      setFollowedAmount(
        Array.isArray(followData.following) ? followData.following.length : 0,
      );
    }
  }, [followData]);

  if (loading || followLoading) return <p>Loading...</p>;
  if (error || followError) return <p>Error loading profile</p>;

  return (
    <ProfileContainer>
      <InfoContainer>
        <ProfileInfo
          isProfileOwner={isProfileOwner}
          setActiveTab={setActiveTab}
          userDetails={userDetails ?? ({} as UserDetails)}
          loading={loading}
          error={error ?? false}
          postsLength={postsLength}
          followersAmount={followersAmount}
          followedAmount={followedAmount}
          followers={followData ? followData.followers : []}
        />
      </InfoContainer>
      <ContentContainer>
        {activeTab === "posts" ? (
          <ImagesGrid
            id={slug}
            userDetails={userDetails ?? ({} as UserDetails)}
            setPostsLength={setPostsLength}
            isProfileOwner={isProfileOwner}
          />
        ) : (
          <FollowList
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            id={slug}
            isProfileOwner={isProfileOwner}
          />
        )}
      </ContentContainer>
    </ProfileContainer>
  );
};

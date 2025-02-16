"use client";
import { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInformation/ProfileInformation";
import { ContentContainer, InfoContainer, ProfileContainer } from "./styled";
import { ImagesGrid } from "../ImagesGrid/ImagesGrid";
import FollowList from "./FollowList/Followlist";
import useFetch from "@/app/lib/hooks/useFetch";
import { useUser } from "@/app/lib/hooks/userContext";
import { UserDetails } from "@/shared/types/user";

interface UserDetailsResponse {
  userDetails: UserDetails;
  message: string;
}

interface ProfileComponentProps {
  slug: string;
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({ slug }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, loading, error } = useFetch<UserDetailsResponse>(
    `/api/user/${slug}`,
  );

  const { user } = useUser();
  const userDetails = data?.userDetails;
  const isProfileOwner = user?.user_id === userDetails?.user_id;

  const [activeTab, setActiveTab] = useState<
    "followers" | "followed" | "posts"
  >("posts");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;

  return (
    <ProfileContainer>
      <InfoContainer>
        <ProfileInfo
          isProfileOwner={isProfileOwner}
          setActiveTab={setActiveTab}
          userDetails={userDetails ?? ({} as UserDetails)}
          loading={loading}
          error={error ?? false}
        />
      </InfoContainer>
      <ContentContainer>
        {activeTab === "posts" ? (
          <ImagesGrid
            id={slug}
            userDetails={userDetails ?? ({} as UserDetails)}
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

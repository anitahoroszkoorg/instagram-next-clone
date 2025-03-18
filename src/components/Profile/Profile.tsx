"use client";
import { useState } from "react";
import { ContentContainer, InfoContainer, ProfileContainer } from "./styled";
import { ImagesGrid } from "../ImagesGrid/ImagesGrid";
import FollowList from "./FollowList/Followlist";
import { useUser } from "@/app/hooks/userContext";
import ProfileInfo from "./ProfileInformation/ProfileInformation";
import { useProfileData } from "@/app/hooks/useProfileData";

interface ProfileComponentProps {
  slug: string;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ slug }) => {
  const { data: profile, isLoading, error } = useProfileData(slug.toString());
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState<
    "followers" | "followed" | "posts"
  >("posts");
  const [postsLength, setPostsLength] = useState(0);

  const isProfileOwner = user?.user_id === profile?.user_id;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <ProfileContainer>
      <InfoContainer>
        <ProfileInfo
          setActiveTab={setActiveTab}
          postsLength={postsLength}
          isProfileOwner={isProfileOwner}
        />
      </InfoContainer>
      <ContentContainer>
        {activeTab === "posts" ? (
          <ImagesGrid
            id={profile?.user_id ?? ""}
            setPostsLength={setPostsLength}
            isProfileOwner={isProfileOwner}
          />
        ) : (
          <FollowList
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            id={profile?.user_id ?? ""}
            isProfileOwner={isProfileOwner}
          />
        )}
      </ContentContainer>
    </ProfileContainer>
  );
};

export default ProfileComponent;

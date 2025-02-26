"use client";
import { useState } from "react";
import { ContentContainer, InfoContainer, ProfileContainer } from "./styled";
import { ImagesGrid } from "../ImagesGrid/ImagesGrid";
import FollowList from "./FollowList/Followlist";
import { useUser } from "@/app/hooks/userContext";
import ProfileInfo from "./ProfileInformation/ProfileInformation";
import { ProfileProvider, useProfile } from "@/app/hooks/profileContext";

interface ProfileComponentProps {
  slug: string;
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({ slug }) => {
  return (
    <ProfileProvider userId={slug}>
      <ProfileContent />
    </ProfileProvider>
  );
};

const ProfileContent: React.FC = () => {
  const { profile, loading, error } = useProfile();
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState<
    "followers" | "followed" | "posts"
  >("posts");
  const [postsLength, setPostsLength] = useState(0);

  const isProfileOwner = user?.user_id === profile?.user_id;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <ProfileContainer>
      <InfoContainer>
        <ProfileInfo setActiveTab={setActiveTab} postsLength={postsLength} />
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

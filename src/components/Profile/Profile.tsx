"use client";
import { useState } from "react";
import { ContentContainer, InfoContainer, ProfileContainer } from "./styled";
import { ImagesGrid } from "../ImagesGrid/ImagesGrid";
import FollowList from "./FollowList/Followlist";
import ProfileInfo from "./ProfileInformation/ProfileInformation";
import { useProfileData } from "@/app/hooks/useProfileData";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import Spinner from "../Loader/Loader";
import ErrorPage from "../Error/Error";

interface ProfileComponentProps {
  slug: string;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ slug }) => {
  const { data: profile, isLoading, error } = useProfileData(slug);
  const { data: user } = useLoggedInUser();

  const [activeTab, setActiveTab] = useState<
    "followers" | "followed" | "posts"
  >("posts");
  const [postsLength, setPostsLength] = useState(0);

  const isProfileOwner = user?.user_id === profile?.user_id;

  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage />;

  return (
    <ProfileContainer>
      <InfoContainer>
        <ProfileInfo
          slug={slug}
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

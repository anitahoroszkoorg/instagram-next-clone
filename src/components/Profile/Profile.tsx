"use client";
import { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInformation/ProfileInformation";
import { ContentContainer, InfoContainer, ProfileContainer } from "./styled";
import { ImagesGrid } from "../ImagesGrid/ImagesGrid";
import FollowList from "./FollowList/Followlist";

export const ProfileComponent = ({ slug }: any) => {
  useEffect(() => {
    window.scroll(0, 0);
  });
  const [activeTab, setActiveTab] = useState<
    "followers" | "following" | "posts"
  >("posts");
  return (
    <>
      <ProfileContainer>
        <InfoContainer>
          <ProfileInfo slug={slug} setActiveTab={setActiveTab} />
        </InfoContainer>
        <ContentContainer>
          {activeTab === "posts" ? (
            <ImagesGrid id={slug} />
          ) : (
            <FollowList
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              id={slug}
            />
          )}
        </ContentContainer>
      </ProfileContainer>
    </>
  );
};

"use client";
import { useEffect } from "react";
import ProfileInfo from "./ProfileInformation/ProfileInformation";
import { ContentContainer, InfoContainer, ProfileContainer } from "./styled";
import { ImagesGrid } from "../ImagesGrid/ImagesGrid";

export const ProfileComponent = ({ slug }: any) => {
  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <>
      <ProfileContainer>
        <InfoContainer>
          <ProfileInfo slug={slug} />`
        </InfoContainer>
        <ContentContainer>
          <ImagesGrid />
        </ContentContainer>
      </ProfileContainer>
    </>
  );
};

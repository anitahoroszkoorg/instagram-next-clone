import React, { useState } from "react";
import {
  ProfileContainer,
  ProfilePictureContainer,
  FollowButton,
  MessageButton,
  StatsContainer,
  Stats,
  InstaStoriesContainer,
  Instastory,
  InstastoryImg,
  Avatar,
  Username,
  ButtonsContainer,
  Bio,
  Name,
  ProfileDescription,
} from "./styled";

export const ProfileInfo = ({ slug }: any) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <ProfileContainer>
      <ProfilePictureContainer>
        <Avatar>
          <img src="/avatar.jpeg" alt="User Avatar" width={300} height={300} />
        </Avatar>
      </ProfilePictureContainer>
      <Username>@{slug}</Username>
      <StatsContainer>
        <Stats>6 Posts</Stats>
        <Stats>60 Followers</Stats>
        <Stats>345 Following</Stats>
      </StatsContainer>
      <ButtonsContainer>
        <FollowButton
          isFollowing={isFollowing}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "Following" : "Follow"}
        </FollowButton>
        <MessageButton>Message</MessageButton>
      </ButtonsContainer>
      <Bio>
        <Name>Anita Victoria</Name>
        <ProfileDescription>🌎 TRAVELLER 🌍 </ProfileDescription>
      </Bio>
      <InstaStoriesContainer>
        <Instastory>
          <InstastoryImg
            src="https://images.unsplash.com/photo-1735124283566-5f5707a40808?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Intastory"
          />
          <p>Portugal 🇵🇹</p>
        </Instastory>
        <Instastory>
          <InstastoryImg
            alt="Intastory"
            src="https://plus.unsplash.com/premium_photo-1712171314346-f2b287e72ce7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <p>France 🇫🇷</p>
        </Instastory>
        <Instastory>
          <InstastoryImg
            alt="Intastory"
            src="https://plus.unsplash.com/premium_photo-1712150016582-06ba8020fcce?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <p>Italy 🇮🇹</p>
        </Instastory>
        <Instastory>
          <InstastoryImg
            alt="Intastory"
            src="https://plus.unsplash.com/premium_photo-1712149971534-64ba0ae31715?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <p>Spain 🇪🇸</p>
        </Instastory>
      </InstaStoriesContainer>
    </ProfileContainer>
  );
};

export default ProfileInfo;

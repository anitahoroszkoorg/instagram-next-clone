import React, { useState } from "react";
import {
  ProfileContainer,
  ProfilePictureContainer,
  FollowButton,
  MessageButton,
  StatsContainer,
  Stats,
  Avatar,
  Username,
  ButtonsContainer,
  Bio,
  Name,
  ProfileDescription,
} from "./styled";
import useFetch from "@/app/lib/hooks/useFetch";
import { Stories } from "../Stories/Stories";
import { useUser } from "@/app/lib/hooks/userContext";
import { fetchData } from "@/app/lib/fetchData";

interface UserDetails {
  username: string;
  full_name: string;
  bio: string;
  user_id: string;
}

interface UserDetailsResponse {
  userDetails: UserDetails;
  message: string;
}

interface ProfileInfoProps {
  slug: string;
  setActiveTab: (tab: "followers" | "following" | "posts") => void;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  slug,
  setActiveTab,
}) => {
  const [isfollowing, setIsFollowing] = useState<boolean>(false);

  const { data, loading, error } = useFetch<UserDetailsResponse>(
    `/api/user/${slug}`,
  );

  const { user } = useUser();

  const userDetails = data?.userDetails;

  const isProfileOwner = data?.userDetails.user_id === user?.user_id;

  const followUser = async () => {
    try {
      const response = await fetchData("/api/follow", "POST", {
        user_id: slug,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfileContainer>
      <ProfilePictureContainer>
        <Avatar>
          <img src="/avatar.jpeg" alt="User Avatar" width={300} height={300} />
        </Avatar>
      </ProfilePictureContainer>
      <Username>@{userDetails?.username}</Username>
      <StatsContainer>
        <Stats onClick={() => setActiveTab("posts")}>6 Posts</Stats>
        <Stats onClick={() => setActiveTab("followers")}>60 Followers</Stats>
        <Stats onClick={() => setActiveTab("following")}>345 Following</Stats>
      </StatsContainer>
      <ButtonsContainer>
        {!isProfileOwner ? (
          <>
            <FollowButton
              $isfollowing={isfollowing}
              onClick={() => {
                setIsFollowing(!isfollowing);
                followUser();
              }}
            >
              {isfollowing ? "Following" : "Follow"}
            </FollowButton>
            <MessageButton>Message</MessageButton>
          </>
        ) : (
          <>
            <FollowButton $isfollowing={true}>Edit</FollowButton>
            <MessageButton>Settings</MessageButton>
          </>
        )}
      </ButtonsContainer>
      <Bio>
        <Name>{userDetails?.full_name}</Name>
        {userDetails?.bio && (
          <ProfileDescription>{userDetails.bio}</ProfileDescription>
        )}
      </Bio>
      <Stories isProfileOwner={isProfileOwner} />
    </ProfileContainer>
  );
};

export default ProfileInfo;

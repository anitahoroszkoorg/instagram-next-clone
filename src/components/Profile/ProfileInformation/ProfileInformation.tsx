"use client";
import React, { useEffect, useState } from "react";
import {
  ProfileContainer,
  ProfilePictureContainer,
  FollowButton,
  MessageButton,
  StatsContainer,
  Stats,
  Username,
  ButtonsContainer,
  Bio,
  Name,
  ProfileDescription,
  AvatarWrapper,
} from "./styled";
import { Stories } from "../Stories/Stories";
import { fetchData } from "@/app/utils/fetchData";
import ProfileEditModal from "@/components/ProfileInfoModal/ProfileInfoModal";
import Image from "next/image";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { useProfileData } from "@/app/hooks/useProfileData";
import { useQueryClient } from "@tanstack/react-query";
import ErrorPage from "@/components/Error/Error";
import Spinner from "@/components/Loader/Loader";
import { useFollowData } from "@/app/hooks/useFollowData";

interface ProfileInfoProps {
  setActiveTab: (tab: "followers" | "followed" | "posts") => void;
  postsLength: number;
  slug: string;
  isProfileOwner: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  setActiveTab,
  postsLength,
  slug,
  isProfileOwner,
}) => {
  const { data: profile, isLoading, error } = useProfileData(slug);
  const {
    data: followData,
    isLoading: isFollowLoading,
    isError,
  } = useFollowData(slug);
  const followers = followData?.followers ?? [];
  const followed = followData?.followed ?? [];
  const { data: user } = useLoggedInUser();
  const followerCount = Array.isArray(followers) ? followers.length : 0;
  const followedCount = Array.isArray(followed) ? followed.length : 0;
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const isFollowed = !!(
      user &&
      Array.isArray(followers) &&
      followers.some((follower) => follower.user_id === user.user_id)
    );
    setIsFollowing(isFollowed);
  }, [user, followers]);

  const followUser = async () => {
    try {
      await fetchData("/api/follow", "POST", { user_id: profile?.user_id });
      setIsFollowing(true);

      queryClient.setQueryData(["followers", slug], (old: any) =>
        Array.isArray(old) ? [...old, { user_id: user?.user_id }] : old,
      );
    } catch (error) {
      console.error("Error following user:", error);
      setIsFollowing(false);
    }
  };

  const unFollowUser = async () => {
    try {
      await fetchData("/api/follow", "DELETE", { user_id: profile?.user_id });
      setIsFollowing(false);
      queryClient.setQueryData(["followers", slug], (old: any) =>
        Array.isArray(old)
          ? old.filter((follower) => follower.user_id !== user?.user_id)
          : old,
      );
    } catch (error) {
      console.error("Error unfollowing user:", error);
      setIsFollowing(true);
    }
  };

  if (isLoading) return <Spinner />;
  if (error || !profile) return <ErrorPage />;

  const avatarSrc =
    profile.profile_picture && typeof profile.profile_picture === "object"
      ? `data:image/jpeg;base64,${btoa(
          String.fromCharCode(
            ...new Uint8Array(Object.values(profile.profile_picture)),
          ),
        )}`
      : "/avatar.jpeg";

  return (
    <ProfileContainer>
      <ProfilePictureContainer>
        <AvatarWrapper>
          <Image
            src={avatarSrc}
            alt="User Avatar"
            width={300}
            height={300}
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </AvatarWrapper>
      </ProfilePictureContainer>
      <Username>@{profile.username}</Username>
      <StatsContainer>
        <Stats onClick={() => setActiveTab("posts")}>
          {postsLength ?? 0} Posts
        </Stats>
        <Stats onClick={() => setActiveTab("followers")}>
          {followerCount} Followers
        </Stats>
        <Stats onClick={() => setActiveTab("followed")}>
          {followedCount} Following
        </Stats>
      </StatsContainer>
      <ButtonsContainer>
        {!isProfileOwner ? (
          <>
            <FollowButton
              $isfollowing={isFollowing}
              onClick={isFollowing ? unFollowUser : followUser}
            >
              {isFollowing ? "Following" : "Follow"}
            </FollowButton>
            <MessageButton>Message</MessageButton>
          </>
        ) : (
          <>
            <FollowButton
              $isfollowing={true}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </FollowButton>
            <MessageButton>Settings</MessageButton>
          </>
        )}
      </ButtonsContainer>
      <Bio>
        <Name>{profile.full_name}</Name>
        {profile.bio && <ProfileDescription>{profile.bio}</ProfileDescription>}
      </Bio>
      <Stories isProfileOwner={isProfileOwner} />
      {isEditing && <ProfileEditModal closeModal={() => setIsEditing(false)} />}
    </ProfileContainer>
  );
};

export default ProfileInfo;

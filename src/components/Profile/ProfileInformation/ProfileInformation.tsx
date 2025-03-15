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
import { useUser } from "@/app/hooks/userContext";
import { useProfile } from "@/app/hooks/profileContext";
import Image from "next/image";

interface ProfileInfoProps {
  setActiveTab: (tab: "followers" | "followed" | "posts") => void;
  postsLength: number;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  setActiveTab,
  postsLength,
}) => {
  const { profile, followers, following, loading, error } = useProfile();
  const { user } = useUser();

  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isProfileOwner = user?.user_id === profile?.user_id;

  useEffect(() => {
    if (user && followers.length > 0) {
      const userHasFollowed = followers.some(
        (follower) => follower.user_id === user.user_id,
      );
      setIsFollowing(userHasFollowed);
    }
  }, [user, followers]);

  const followUser = async () => {
    try {
      await fetchData("/api/follow", "POST", { user_id: profile?.user_id });
      setIsFollowing(true);
    } catch (error) {
      console.error("Error following user:", error);
      setIsFollowing(false);
    }
  };

  const unFollowUser = async () => {
    try {
      await fetchData("/api/follow", "DELETE", { user_id: profile?.user_id });
      setIsFollowing(false);
    } catch (error) {
      console.error("Error unfollowing user:", error);
      setIsFollowing(true);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile</p>;
  if (!profile) return <p>User not found</p>;

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
          {followers.length} Followers
        </Stats>
        <Stats onClick={() => setActiveTab("followed")}>
          {following.length} Following
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

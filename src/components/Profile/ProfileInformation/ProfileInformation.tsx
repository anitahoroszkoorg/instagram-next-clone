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
import ProfileEditModal from "@/components/ProfileInfoModal/ProfileInfoModal";
import { useUser } from "@/app/hooks/userContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useProfileData } from "@/app/hooks/useProfileData";
import { useFollowersData } from "@/app/hooks/useFollowersData";
import { useFollowingData } from "@/app/hooks/useFollowingData";
import { fetchData } from "@/app/utils/fetchData";
import { UserInfo } from "@/shared/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ProfileInfoProps {
  setActiveTab: (tab: "followers" | "followed" | "posts") => void;
  postsLength: number;
  isProfileOwner: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  setActiveTab,
  postsLength,
  isProfileOwner,
}) => {
  const params = useParams();
  const userId = params.slug;
  const { data: profile, isLoading, error } = useProfileData(userId);
  const { data: followersData } = useFollowersData(userId);
  const { data: followingData } = useFollowingData(userId);
  const { user } = useUser();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (user && followersData?.data?.followers) {
      const userHasFollowed = followersData.data?.followers.some(
        (follower: UserInfo) => follower.user_id === user.user_id,
      );
      setIsFollowing(userHasFollowed);
    } else {
      setIsFollowing(false);
    }
  }, [user, followersData]);

  const followMutation = useMutation({
    mutationFn: async () => {
      await fetchData("/api/follow", "POST", { user_id: profile?.user_id });
      setIsFollowing(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });
    },
    onError: () => {
      setIsFollowing(false);
    },
  });

  const unFollowMutation = useMutation({
    mutationFn: async () => {
      await fetchData("/api/follow", "DELETE", { user_id: profile?.user_id });
      setIsFollowing(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: () => {
      setIsFollowing(true);
    },
  });

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile</p>;
  if (!profile) return <p>User not found</p>;

  return (
    <ProfileContainer>
      <ProfilePictureContainer>
        <AvatarWrapper>
          <Image
            src={"/avatar.jpeg"}
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
          {followersData?.data?.followers.length ?? 0} Followers
        </Stats>
        <Stats onClick={() => setActiveTab("followed")}>
          {followingData?.data?.following.length ?? 0} Following
        </Stats>
      </StatsContainer>
      <ButtonsContainer>
        {!isProfileOwner ? (
          <>
            <FollowButton
              $isfollowing={isFollowing}
              onClick={
                isFollowing
                  ? () => unFollowMutation.mutate()
                  : () => followMutation.mutate()
              }
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

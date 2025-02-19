import React, { useEffect, useState } from "react";
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
import { Stories } from "../Stories/Stories";
import { fetchData } from "@/app/lib/fetchData";
import { UserDetails } from "@/shared/types/user";
import ProfileEditModal from "@/components/ProfileInfoModal/ProfileInfoModal";
import { useUser } from "@/app/lib/hooks/userContext";
import { User } from "@/globals";

interface ProfileInfoProps {
  setActiveTab: (tab: "followers" | "followed" | "posts") => void;
  isProfileOwner: boolean;
  userDetails: UserDetails;
  loading: boolean;
  error: boolean;
  postsLength: number;
  followersAmount: number;
  followedAmount: number;
  followers: User[];
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  setActiveTab,
  isProfileOwner,
  userDetails,
  loading,
  error,
  postsLength,
  followersAmount,
  followers,
  followedAmount,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user && followers.length > 0) {
      const userHasFollowed = followers.some(
        (follower: User) => follower.user_id === user.user_id,
      );
      setIsFollowing(userHasFollowed);
    }
  }, [user, followers]);

  const followUser = async () => {
    try {
      await fetchData("/api/follow", "POST", { user_id: userDetails.user_id });
      setIsFollowing(true);
    } catch (error) {
      console.error("Error following user:", error);
      setIsFollowing(false);
    }
  };

  const unFollowUser = async () => {
    try {
      await fetchData("/api/follow", "DELETE", {
        user_id: userDetails.user_id,
      });
      setIsFollowing(false);
    } catch (error) {
      console.error("Error following user:", error);
      setIsFollowing(true);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile</p>;
  if (!userDetails) return <p>User not found</p>;

  return (
    <ProfileContainer>
      <ProfilePictureContainer>
        <Avatar>
          <img
            src={userDetails.profile_picture || "/avatar.jpeg"}
            alt="User Avatar"
            width={300}
            height={300}
          />
        </Avatar>
      </ProfilePictureContainer>
      <Username>@{userDetails.username}</Username>
      <StatsContainer>
        <Stats onClick={() => setActiveTab("posts")}>{postsLength} Posts</Stats>
        <Stats onClick={() => setActiveTab("followers")}>
          {followersAmount} Followers
        </Stats>
        <Stats onClick={() => setActiveTab("followed")}>
          {followedAmount} Following
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
        <Name>{userDetails?.full_name}</Name>
        {userDetails?.bio && (
          <ProfileDescription>{userDetails.bio}</ProfileDescription>
        )}
      </Bio>
      <Stories isProfileOwner={isProfileOwner} />
      {isEditing && (
        <ProfileEditModal
          onClose={() => setIsEditing(false)}
          onUpdate={(updatedData) => {
            userDetails.bio = updatedData.bio;
            userDetails.profile_picture = updatedData.avatar;
          }}
        />
      )}
    </ProfileContainer>
  );
};

export default ProfileInfo;

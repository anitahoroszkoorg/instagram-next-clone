"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import useFetch from "./useFetch";
import { UserDetails } from "@/shared/types/user";
import { User } from "@/globals";

interface ProfileContextType {
  profile: UserDetails | null;
  followers: User[];
  following: User[];
  loading: boolean;
  error: Error | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) => {
  const { data, loading, error } = useFetch<{ userDetails: UserDetails }>(
    `/api/user/${userId}`,
  );
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [followError, setFollowError] = useState<Error | null>(null);

  useEffect(() => {
    if (data?.userDetails?.user_id) {
      const fetchFollowData = async () => {
        setFollowError(null);
        try {
          const response = await fetch(
            `/api/followers/${data.userDetails.user_id}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const followData = await response.json();
          setFollowers(followData.followers || []);
          setFollowing(followData.following || []);
        } catch (error) {
          console.error("Error fetching follow data:", error);
          setFollowError(error as Error);
          setFollowers([]);
          setFollowing([]);
        }
      };
      fetchFollowData();
    } else {
      setFollowers([]);
      setFollowing([]);
    }
  }, [data]);

  return (
    <ProfileContext.Provider
      value={{
        profile: data?.userDetails ?? null,
        followers,
        following,
        loading,
        error: error ?? followError,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

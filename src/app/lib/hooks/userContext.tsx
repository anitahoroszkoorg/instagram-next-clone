"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, UserInfo } from "@/globals";
import useFetch from "./useFetch";

interface UserContextType {
  user: UserInfo | null;
  loading: boolean;
  error: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const {
    data: userData,
    loading,
    error,
  } = useFetch<{ userDetails: UserInfo }>("/api/user");
  const [followData, setFollowData] = useState<{ followers: User[] } | null>(
    null,
  );
  const [followError, setFollowError] = useState<any>(null);

  useEffect(() => {
    if (userData?.userDetails?.user_id) {
      const fetchFollowData = async () => {
        setFollowError(null);
        try {
          const response = await fetch(
            `/api/followed/${userData.userDetails.user_id}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setFollowData(data);
        } catch (error) {
          console.error("Error fetching follow data:", error);
          setFollowError(error);
          setFollowData(null);
        }
      };
      fetchFollowData();
    } else {
      setFollowData(null);
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.userDetails) {
      setUser((prevUser) => ({
        ...userData.userDetails,
        followed: followData?.followers || [],
      }));
    } else {
      setUser(null);
    }
  }, [userData, followData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || followError) {
    console.error("Error fetching data:", error || followError);
    return <div>Error loading user data</div>;
  }

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

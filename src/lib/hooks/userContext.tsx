"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/globals";
import useFetch from "./useFetch";

type UserContextType = {
  user: User | null;
  loading: boolean;
  error: any;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { data, loading, error } = useFetch<any>("/api/user");

  useEffect(() => {
    if (data?.userDetails) {
      setUser(data.userDetails);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching user details:", error);
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

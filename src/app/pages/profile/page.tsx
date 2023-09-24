"use client";
import Header from "@/app/components/Header/Header";
import Profile from "@/app/components/Profile/Profile";
import SideBar from "@/app/components/Sidebar/SideBar";
import React from "react";
import { AppWrapper } from "../../../../styled";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <AppWrapper>
        <Profile />
        <SideBar />
      </AppWrapper>
    </>
  );
};

export default ProfilePage;

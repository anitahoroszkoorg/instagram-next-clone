"use client";
import { AppWrapper } from "./styled";
import React from "react";
import Profile from "../Profile/Profile";
import SideBar from "../Sidebar/SideBar";
import Feed from "../Feed/Feed";
import Header from "../Header/Header";
import Create from "../Create/Create";

export const HomePage = () => {
  return (
    <>
      <Create />
      <Header />
      <AppWrapper>
        <Profile />
        <SideBar />
      </AppWrapper>
    </>
  );
};

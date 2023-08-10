"use client";

import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import SideBar from "./components/Sidebar/SideBar";
import { AppWrapper } from "./styled";

export default function Home() {
  return (
    <AppWrapper>
      <Profile />
      <Feed />
      <SideBar />
    </AppWrapper>
  );
}

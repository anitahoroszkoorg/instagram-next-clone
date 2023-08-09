"use client";

import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import { AppWrapper } from "./styled";

export default function Home() {
  return (
    <AppWrapper>
      <Profile />
      <Feed />
    </AppWrapper>
  );
}

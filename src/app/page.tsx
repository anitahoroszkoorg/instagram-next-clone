"use client";
import { useSession } from "next-auth/react";
import { AppWrapper } from "../../styled";
import StyledComponentsRegistry from "./registry";
import HomePage from "@/components/Home/page";
import Landing from "@/components/Landing/Landing";

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = session?.user;

  return (
    <StyledComponentsRegistry>
      <AppWrapper>{!isLoggedIn ? <Landing /> : <HomePage />}</AppWrapper>
    </StyledComponentsRegistry>
  );
}

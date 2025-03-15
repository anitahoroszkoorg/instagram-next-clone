"use client";
import { useSession } from "next-auth/react";
import { AppWrapper } from "../../styled";
import StyledComponentsRegistry from "./registry";
import HomePage from "@/components/Home/page";
import LoginPage from "./login/page";

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = session?.user;

  return (
    <StyledComponentsRegistry>
      <AppWrapper>{isLoggedIn ? <HomePage /> : <LoginPage />}</AppWrapper>
    </StyledComponentsRegistry>
  );
}

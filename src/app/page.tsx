"use client";
import { AppWrapper } from "../../styled";
import Header from "./components/Header/Header";
import HomePage from "./components/Home/page";
import LoginPage from "./login/page";
import StyledComponentsRegistry from "./registry";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = session?.user;
  console.log(isLoggedIn);

  return (
    <StyledComponentsRegistry>
      <AppWrapper>
        {isLoggedIn ? (
          <>
            <Header />
            <HomePage />
          </>
        ) : (
          <LoginPage />
        )}
      </AppWrapper>
    </StyledComponentsRegistry>
  );
}

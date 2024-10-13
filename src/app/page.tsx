"use client";
import { Header } from "@/components/Header/Header";
import { AppWrapper } from "../../styled";

import LoginPage from "./login/page";
import StyledComponentsRegistry from "./registry";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "@/components/Home/page";

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = session?.user;

  return (
    <StyledComponentsRegistry>
      <ToastContainer />
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

"use client";
import { useSession } from "next-auth/react";
import HomePage from "@/components/Home/page";
import Landing from "@/components/Landing/Landing";
import { AppWrapper } from "../../../styled";
import Spinner from "../Loader/Loader";

export default function ClientHomePageWrapper() {
  const { data: session, status } = useSession();

  console.log(status);

  if (status === "loading") {
    return (
      <AppWrapper>
        <Spinner />
      </AppWrapper>
    );
  }

  const isLoggedIn = !!session?.user;

  return <AppWrapper>{!isLoggedIn ? <Landing /> : <HomePage />}</AppWrapper>;
}

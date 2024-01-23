"use client";
import { AppWrapper } from "../../styled";
import Header from "./components/Header/Header";
import { HomePage } from "./components/Home/page";

export default function Home() {
  return (
    <>
      <Header />
      <AppWrapper>
        <HomePage />
      </AppWrapper>
    </>
  );
}

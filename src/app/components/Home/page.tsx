"use client";
import { AppWrapper } from "./styled";
import React from "react";
import Profile from "../Profile/Profile";
import SideBar from "../Sidebar/SideBar";
import Header from "../Header/Header";
import Create from "../Create/Create";
import { Main } from "../Main/Main";

export const HomePage = () => {
  return (
    <>
      <Header />
      <AppWrapper>
        {/* <Profile /> */}
        <Create
          openModal={false}
          closeModal={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Main />
        <SideBar />
      </AppWrapper>
    </>
  );
};

"use client";
import React from "react";
import Profile from "../Profile/Profile";
import Create from "../Create/Create";
import { ImagesGrid } from "../ImagesGrid/ImagesGrid";

const HomePage = () => {
  return (
    <>
      <Profile />
      <Create
        openModal={false}
        closeModal={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ImagesGrid />
    </>
  );
};

export default HomePage;

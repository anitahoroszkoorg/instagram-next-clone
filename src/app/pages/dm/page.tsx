"use client";

import React from "react";
import Header from "../../components/Header/Header";
import DMPage from "../../components/DMs/DMPage";
import { AppWrapper } from "../../../../styled";

const page = () => {
  return (
    <>
      <Header />
      <AppWrapper>
        <DMPage />
      </AppWrapper>
    </>
  );
};

export default page;

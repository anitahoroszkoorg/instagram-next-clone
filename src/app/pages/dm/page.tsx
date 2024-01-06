"use client";

import DMPage from "@/app/components/DMs/DMPage";
import ListOfMessages from "@/app/components/DMs/ListOfMessages";
import Header from "@/app/components/Header/Header";
import { AppWrapper } from "@/app/components/Home/styled";
import React from "react";


const page = () => {
  return <>
  <Header/>
  <AppWrapper>
    <ListOfMessages/>
     <DMPage />
  </AppWrapper>
  </>;
};

export default page;

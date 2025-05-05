"use client";
import React, { useState } from "react";
import {
  Avatar,
  AvatarWrapper,
  Icon,
  HeaderWrapper,
  IconsWrapper,
  Logo,
  LogoWrapper,
} from "./styled";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import Link from "next/link";
import Create from "../Create/Create";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./styled";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { redirect } from "next/navigation";

export const Header = () => {
  const { data: session } = useSession();
  const logOut = () => {
    signOut();
    redirect("/login");
  };
  const isLoggedIn = session?.user;
  const [openCreateWizard, setOpenCreateWizard] = useState(false);
  const closeModal = () => {
    setOpenCreateWizard(false);
  };

  const { data: user } = useLoggedInUser();

  return !isLoggedIn ? (
    <></>
  ) : (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <Link href="/">
            <Logo src="/logo.png" alt="logo" />
          </Link>
        </LogoWrapper>
        <IconsWrapper>
          <Icon>
            <Link href="/">
              <HomeOutlinedIcon color="primary" />
            </Link>
          </Icon>
          <Icon>
            <AddAPhotoOutlinedIcon
              onClick={() => setOpenCreateWizard(true)}
              color="primary"
            />
          </Icon>
          <Icon>
            <Link href="">
              <FavoriteBorderOutlinedIcon color="primary" />
            </Link>
          </Icon>
          <Icon>
            <Link href="/explore">
              <AppsIcon color="primary" />
            </Link>
          </Icon>
        </IconsWrapper>
        <AvatarWrapper>
          <Button onClick={() => logOut()}>Sign out</Button>
          <Link href={`/profile/${user?.user_id}`}>
            <Avatar>
              <Image
                src="/avatar.jpeg"
                alt="User Avatar"
                width={300}
                height={300}
                priority
              />
            </Avatar>
          </Link>
        </AvatarWrapper>
      </HeaderWrapper>
      <Create openModal={openCreateWizard} closeModal={closeModal} />
    </>
  );
};

export default Header;

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
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import Link from "next/link";
import Create from "../Create/Create";
import Image from "next/image";
import { signOut } from "next-auth/react";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };

  const hyperLinksStyle = {
    textDecoration: "none!important",
    color: "black!important",
    "&:hover": {
      textDecoration: "none!important",
      color: "black!important",
    },
    "&:visited": {
      textDecoration: "none!important",
      color: "black!important",
    },
  };

  return (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <Link href="/" style={hyperLinksStyle}>
            <Logo src="/logo.png" alt="logo" />
          </Link>
        </LogoWrapper>
        <IconsWrapper>
          <Icon>
            <Link href="/" style={hyperLinksStyle}>
              <HomeOutlinedIcon />
            </Link>
          </Icon>
          <Icon>
            <AddAPhotoOutlinedIcon onClick={() => setOpenModal(true)} />
          </Icon>
          <Icon>
            <Link href="/pages/notifications" style={hyperLinksStyle}>
              <FavoriteBorderOutlinedIcon />
            </Link>
          </Icon>
          <Icon>
            <Link href="/pages/inbox" style={hyperLinksStyle}>
              <MailOutlinedIcon />
            </Link>
          </Icon>
        </IconsWrapper>
        <AvatarWrapper>
          <button onClick={() => signOut()}>Sign out</button>
          <Link href="/pages/profile">
            <Avatar>
              <Image
                src="/avatar.jpeg"
                alt="User Avatar"
                width={300}
                height={300}
              />
            </Avatar>
          </Link>
        </AvatarWrapper>
      </HeaderWrapper>
      <Create openModal={openModal} closeModal={closeModal} />
    </>
  );
};

export default Header;

"use client";
import React, { useState } from "react";
import {
  Avatar,
  AvatarWrapper,
  Icon,
  HeaderWrapper,
  IconsWrapper,
  Logo,
  Logo2,
  LogoWrapper,
} from "./styled";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import Link from "next/link"; // Import Link from Next.js
import Create from "../Create/Create";
import Image from "next/image";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <Link href="/">
            <Logo />
          </Link>
        </LogoWrapper>
        <IconsWrapper>
          <Icon>
            <Link href="/">
              <HomeOutlinedIcon />
            </Link>
          </Icon>
          <Icon>
            <AddAPhotoOutlinedIcon onClick={() => setOpenModal(true)} />
          </Icon>
          <Icon>
            <Link href="/pages/notifications">
              <FavoriteBorderOutlinedIcon />
            </Link>
          </Icon>
          <Icon>
            <Link href="/pages/dm">
              <MailOutlinedIcon />
            </Link>
          </Icon>
        </IconsWrapper>
        <AvatarWrapper>
          <Link href="/pages/profile">
            <Avatar>
              <img
                src="https://instagram-anitka.s3.eu-central-1.amazonaws.com/sebastian-pena-lambarri-q79ZzOkbQJ8-unsplash.jpg"
                alt="User Avatar"
              />
              {/* <Image
                src="https://as1.ftcdn.net/v2/jpg/00/81/18/30/1000_F_81183096_QOH14DqWS1Lgbdm8zd2lrLXFTW1Dtp3A.jpg"
                alt="User Avatar"
                width={300}
                height={300}
              /> */}
            </Avatar>
          </Link>
        </AvatarWrapper>
      </HeaderWrapper>
      <Create openModal={openModal} closeModal={closeModal} />
    </>
  );
};

export default Header;

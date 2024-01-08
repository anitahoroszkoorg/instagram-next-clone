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
          <Link href="pages/notifications">
            <FavoriteBorderOutlinedIcon />
            </Link>
          </Icon>
          <Icon>
            <Link href="pages/dm">
              <MailOutlinedIcon />
            </Link>
          </Icon>
        </IconsWrapper>
        <AvatarWrapper>
          <Link href="/pages/profile">
            <Avatar>
              {/*eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://instagram-anitka.s3.eu-central-1.amazonaws.com/sebastian-pena-lambarri-q79ZzOkbQJ8-unsplash.jpg"
                alt="User Avatar"
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

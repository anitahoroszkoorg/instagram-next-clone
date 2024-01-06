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
import instalogo from "../../assets/instagram-text-logo.png";
import Link from "next/link";
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
          <Logo />
        </LogoWrapper>
        <IconsWrapper>
          <Icon>
            <HomeOutlinedIcon />
          </Icon>
          <Icon>
            <SearchOutlinedIcon />
          </Icon>
          <Icon>
            <AddAPhotoOutlinedIcon onClick={() => setOpenModal(true)} />
          </Icon>
          <Icon>
            <FavoriteBorderOutlinedIcon />
          </Icon>
        </IconsWrapper>
        <AvatarWrapper>
          <Icon>
            <Link href='pages/dm'><MailOutlinedIcon /></Link>
            
          </Icon>
          <Avatar src="https://instagram-anitka.s3.eu-central-1.amazonaws.com/sebastian-pena-lambarri-q79ZzOkbQJ8-unsplash.jpg" />
        </AvatarWrapper>
      </HeaderWrapper>
      <Create openModal={openModal} closeModal={closeModal} />
    </>
  );
};

export default Header;

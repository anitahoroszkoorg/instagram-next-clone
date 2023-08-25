"use client";
import React from "react";
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
// import instalogo from "../../assets/instalogo.png";
// import avatar from "../../assets/avatar.jpg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
const Header = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        {/* <Logo src={instalogo} alt="logo" /> */}
        {/* <Logo2
          src="https://www.citypng.com/public/uploads/preview/-11590321548vfiwckfjs3.png"
          alt="instagram"
        /> */}
      </LogoWrapper>
      <IconsWrapper>
        <Icon>
          <HomeOutlinedIcon />
        </Icon>
        <Icon>
          <SearchOutlinedIcon />
        </Icon>
        <Icon>
          <SmartDisplayOutlinedIcon />
        </Icon>
        <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </IconsWrapper>
      <AvatarWrapper>
        <Icon>
          <MailOutlinedIcon />
        </Icon>
        {/* <Avatar src={avatar} /> */}
      </AvatarWrapper>
    </HeaderWrapper>
  );
};

export default Header;

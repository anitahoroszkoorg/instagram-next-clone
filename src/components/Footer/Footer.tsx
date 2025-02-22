import React from "react";
import Link from "next/link";
import { FooterContainer, FooterLinks, CopyrightText } from "./styled";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
      </FooterLinks>
      <CopyrightText>
        © {new Date().getFullYear()} Instagram Clone. All rights reserved.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;

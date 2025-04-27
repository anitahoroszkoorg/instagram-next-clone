"use client";
import { useEffect, useRef } from "react";
import Form from "./form";
import { gsap } from "gsap";
import { Card, SignUp, Title, Logo } from "./styled";
import { Background, Wrapper } from "@/components/Landing/styled";
import { Grand_Hotel } from "next/font/google";

const hotel = Grand_Hotel({
  weight: "400",
  subsets: ["latin"],
});

export default function LoginPage() {
  const backgroundRef = useRef<any>(null);

  useEffect(() => {
    const background = backgroundRef.current;

    if (!background) return;

    const bgTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "linear" },
    });
    bgTimeline
      .to(background, {
        backgroundPosition: "100% 50%",
        duration: 5,
      })
      .to(background, {
        backgroundPosition: "0% 50%",
        duration: 5,
      });
  }, []);

  return (
    <>
      <Wrapper>
        <Background ref={backgroundRef} />
        <Card>
          <Title>Log in to</Title>
          <Logo className={hotel.className}>
            {"Instagram".split("").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </Logo>
          <Form />
          <SignUp href="/register">Don't have an account? Sign up</SignUp>
        </Card>
      </Wrapper>
    </>
  );
}

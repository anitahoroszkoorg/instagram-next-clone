"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, SignUp, Title, Logo } from "../login/styled";
import { Background, Wrapper } from "@/components/Landing/styled";
import { Grand_Hotel } from "next/font/google";
import Form from "./form";

const hotel = Grand_Hotel({
  weight: "400",
  subsets: ["latin"],
});

const Register = () => {
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
          <Title>Register to</Title>
          <Logo className={hotel.className}>
            {"Instagram".split("").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </Logo>
          <Form />
          <SignUp href="/login">Already have an account? Log in</SignUp>
        </Card>
      </Wrapper>
    </>
  );
};

export default Register;

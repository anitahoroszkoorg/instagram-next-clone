"use client";
import { Grand_Hotel } from "next/font/google";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  Wrapper,
  Background,
  Glass,
  Logo,
  LandingButton,
  ButtonContainer,
} from "./styled";
import { useRouter } from "next/navigation";

const hotel = Grand_Hotel({
  weight: "400",
  subsets: ["latin"],
});

export default function LandingPage() {
  const textRef = useRef<any>(null);
  const backgroundRef = useRef<any>(null);
  const glassRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const text = textRef.current;
    const background = backgroundRef.current;
    const glass = glassRef.current;

    if (!text || !background || !glass) return;

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

    const glassTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "linear" },
    });
    glassTimeline
      .to(glass, {
        backgroundPositionX: "60%",
        backgroundPositionY: "60%",
        duration: 8,
      })
      .to(glass, {
        backgroundPositionX: "40%",
        backgroundPositionY: "40%",
        duration: 8,
      });

    const lettersEl = text.querySelectorAll("span");

    gsap.fromTo(
      lettersEl,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.2,
        onComplete: () => {
          handleMouseFollow();
        },
      },
    );

    const handleMouseMove = (e: MouseEvent) => {
      const rect = text.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const rotateX = (deltaY / rect.height) * 10;
      const rotateY = (-deltaX / rect.width) * 10;

      gsap.to(text, {
        rotateX,
        rotateY,
        skewX: rotateY * 0.5,
        skewY: rotateX * 0.5,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(text, {
        rotateX: 0,
        rotateY: 0,
        skewX: 0,
        skewY: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    const handleMouseFollow = () => {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    };

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Wrapper>
      <Background ref={backgroundRef} />
      <Glass ref={glassRef} />
      <Logo className={hotel.className} ref={textRef}>
        {"Instagram".split("").map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </Logo>
      <ButtonContainer>
        <LandingButton>Demo mode</LandingButton>
        <LandingButton onClick={() => router.push("/register")}>
          Classic mode
        </LandingButton>
      </ButtonContainer>
    </Wrapper>
  );
}

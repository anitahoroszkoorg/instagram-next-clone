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
        duration: 20,
      })
      .to(background, {
        backgroundPosition: "0% 50%",
        duration: 20,
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

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
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

      const moveX = (e.clientX / innerWidth - 0.5) * 20;
      const moveY = (e.clientY / innerHeight - 0.5) * 20;

      gsap.to(background, {
        backgroundPositionX: `calc(50% + ${moveX}px)`,
        backgroundPositionY: `calc(50% + ${moveY}px)`,
        duration: 1.5,
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

      gsap.to(background, {
        backgroundPosition: "50% 50%",
        duration: 1.5,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      bgTimeline.kill();
      glassTimeline.kill();
    };
  }, []);

  return (
    <Wrapper>
      <Background ref={backgroundRef} />
      <Glass ref={glassRef} />
      <Logo className={hotel.className} ref={textRef}>
        Instagram
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

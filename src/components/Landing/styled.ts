import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Background = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    #fcaf45,
    #f77737,
    #e1306c,
    #833ab4,
    #fd1d1d
  );
  background-size: 500% 500%;
  background-position: 50% 50%;
  z-index: 0;
`;

export const Glass = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.05);
  pointer-events: none;
  z-index: 1;
  background-image: radial-gradient(
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size:
    3px 3px,
    7px 7px;
  mix-blend-mode: overlay;
  opacity: 0.3;
`;

export const Logo = styled.p`
  position: relative;
  color: white;
  font-size: 6em;
  perspective: 1000px;
  transform-style: preserve-3d;
  will-change: transform;
  text-align: center;
  z-index: 2;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-top: 2em;
`;

export const LandingButton = styled.button`
  position: relative;
  background: transparent;
  border: 1px solid white;
  color: white;
  font-size: 1em;
  padding: 0.5em 1em;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

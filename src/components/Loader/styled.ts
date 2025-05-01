import styled, { keyframes } from "styled-components";

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
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
  overflow: hidden;
`;

export const SpinnerCircle = styled.div`
  width: 60px;
  height: 60px;
  border: 8px solid var(--ig-white);

  border-top: 8px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1.2s linear infinite;
`;

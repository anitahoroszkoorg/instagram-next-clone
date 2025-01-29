import styled from "styled-components";

export const FeedWrapper = styled.div`
  display: flex;
  font-size: 1em;
  border-radius: 3px;
  width: 90%;
  height: 80%;
  flex-wrap: wrap;
  overflow-x: hidden;
  padding: 1rem;
`;
import { keyframes } from "styled-components";

const myAnim = keyframes`
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
`;

export const Photobox = styled.img`
  margin: 10px;
  width: 250px;
  height: 250px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background: white;
  border-radius: 10px;
  display: flex;
  &:hover {
    animation: ${myAnim} 1.2s ease-in-out;
  }
`;

export const BackDropContainer = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

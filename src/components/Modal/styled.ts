import styled from "styled-components";

export const BackDropContainer = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background: var(--ig-backdrop);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: relative;
  transform: translateY(-6em);
  div.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #000;
  }
  z-index: 1000;
  margin: 5em 0em 6em 0em;
`;

export const ModalHeader = styled.div`
  position: relative;
  transform: translateY(2em);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
  flex-direction: row;
  height: 1em;
`;

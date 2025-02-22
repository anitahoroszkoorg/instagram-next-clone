import styled from "styled-components";

export const BackDropContainer = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--ig-backdrop);
  z-index: 5;
`;

export const Photobox = styled.img`
  margin: 0rem 1rem 1rem 1rem;
  width: 25em;
  height: 25em;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 10px;
  display: flex;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  div.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #000;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

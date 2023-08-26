import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 33vw;
  height: 50vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 140px;
  right: 410px;
  cursor: pointer;
`;

export const ImgUpload = styled.img`
  width: 50%;
  height: 70%;
  padding: 10px;
  margin-right: 25px;
`;

export const Input = styled.input`
  color: blue;
  display: none !important;
`;

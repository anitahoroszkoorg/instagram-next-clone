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
  width: 500px;
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
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #000;
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

export const ModalInside = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const SelectedImage = styled.img`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UploadBtn = styled.button`
  height: 2.2rem;
  width: 40%;
  margin: 1rem;
  border-radius: 5px;
  justify-content: center;
  border: none;
  background-color: #4c68d7;
  color: white;
  padding: 5px;
`;

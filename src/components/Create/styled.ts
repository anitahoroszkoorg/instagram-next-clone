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
  z-index: 10;
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
  width: 250px;
  padding: 10px;
  margin-right: 25px;
`;

export const WizardImg = styled.div`
  height: 100%;
  overflow: hidden;
`;

export const Input = styled.input`
  color: blue;
  display: none;
`;

interface ButtonProps {
  isFileSelected: boolean;
}

export const UploadBtn = styled.button<ButtonProps>`
  height: 2.2rem;
  width: ${(props) => (props.isFileSelected ? "90%" : "40%")};
  border-radius: 5px;
  justify-content: center;
  border: none;
  background-color: #4c68d7;
  color: white;
  padding: 5px;
  margin-left: ${(props) => (props.isFileSelected ? "12px" : "10px")};
  margin-top: 12px;
`;

export const CaptionInput = styled.textarea`
  border: 1px solid darkgrey;
  border-radius: 5px;
  height: 6rem;
  resize: none;
  margin-left: 10px;
`;

export const CreateWizardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
`;

export const CreateWizardActions = styled.div`
  display: flex;
  flex-direction: column;
`;

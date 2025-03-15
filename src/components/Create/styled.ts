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
  justify-content: space-around;
  align-items: center;
  position: relative;
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
  color: var(--ig-dark-grey);
`;

export const ImgUpload = styled.img`
  width: 250px;
  padding: 10px;
  margin-right: 25px;
`;

export const ImageWrapper = styled.div`
  width: 20em;
  height: 20em;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0.8em;
`;

export const Input = styled.input`
  color: var(--ig-blue);
  display: none;
`;

export const Error = styled.p`
  color: var(--ig-red);
  font-size: 0.6em;
`;

interface UploadBtnProps {
  $isFileSelected: boolean;
}

export const UploadBtn = styled.button.attrs<UploadBtnProps>((props) => ({
  $isFileSelected: props.$isFileSelected,
}))`
  height: 2.2em;
  display: flex;
  width: fit-content;
  border-radius: 5px;
  align-items: center;
  border: none;
  background-color: var(--ig-blue);
  color: white;
  padding: 1em;
`;

export const CaptionInput = styled.textarea`
  border-radius: 5px;
  height: 4em;
  resize: none;
  min-width: 24em;
  max-width: 24em;
  margin: 1em;
`;

export const CreateWizardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 1em;
`;

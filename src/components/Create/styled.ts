import styled from "styled-components";

export const ImgUpload = styled.img`
  width: 15.5em;
  padding: 0.6em;
  margin-right: 1.5em;
  object-fit: cover;
`;

export const WizardImg = styled.div`
  height: 100%;
  overflow: hidden;
`;

export const Input = styled.input`
  color: blue;
  display: none;
`;

interface UploadBtnProps {
  $isFileSelected: boolean;
}

export const UploadBtn = styled.button.attrs<UploadBtnProps>((props) => ({
  $isFileSelected: props.$isFileSelected,
}))`
  height: 2.2rem;
  width: ${(props) => (props.$isFileSelected ? "90%" : "40%")};
  border-radius: 0.3em;
  justify-content: center;
  border: none;
  background-color: #4c68d7;
  color: white;
  padding: 0.3em;
  margin-left: ${(props) => (props.$isFileSelected ? "0.75em" : "0.6em")};
  margin-top: 0.75em;
`;

export const CaptionInput = styled.textarea`
  border: 1px solid darkgrey;
  border-radius: 0.3em;
  height: 6rem;
  resize: none;
  margin-left: 0.6em;
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

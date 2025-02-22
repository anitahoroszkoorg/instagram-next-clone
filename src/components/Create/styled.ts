import styled from "styled-components";

export const ImgUpload = styled.img`
  width: 250px;
  padding: 10px;
  margin-right: 25px;
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
  border-radius: 5px;
  justify-content: center;
  border: none;
  background-color: #4c68d7;
  color: white;
  padding: 5px;
  margin-left: ${(props) => (props.$isFileSelected ? "12px" : "10px")};
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

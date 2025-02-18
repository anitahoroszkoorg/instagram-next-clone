import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--ig-backdrop);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 10;
`;

export const ModalContent = styled.div`
  background-color: var(--ig-white);
  padding: 1.25em;
  border-radius: 0.5em;
  width: 31.25em;
  height: 31.25em;
  box-shadow: 0 0.125em 0.25em var(--ig-medium-grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 0.625em;
  right: 0.625em;
  cursor: pointer;
  font-size: 1.25em;
  color: var(--ig-black);
`;

export const AvatarPreview = styled.img`
  width: 16em;
  padding: 0.625em;
  margin-right: 1.5em;
  object-fit: cover;
  border-radius: 50%;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const UploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 40%;
  border-radius: 0.3em;
  border: none;
  background-color: var(--ig-blue);
  color: var(--ig-white);
  padding: 0.3em;
  margin-top: 0.75em;
  cursor: pointer;
  input {
    display: none;
  }
`;

export const InputField = styled.textarea`
  border: 0.0625em solid var(--ig-medium-grey);
  border-radius: 0.3em;
  height: 6em;
  resize: none;
  margin-top: 0.625em;
  width: 90%;
`;

export const SaveButton = styled.button`
  height: 2.2em;
  width: 90%;
  border-radius: 0.3em;
  border: none;
  background-color: var(--ig-blue);
  color: var(--ig-white);
  padding: 0.3em;
  margin-top: 0.75em;
  cursor: pointer;
`;

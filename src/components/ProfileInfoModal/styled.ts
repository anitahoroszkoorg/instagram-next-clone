import styled from "styled-components";

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

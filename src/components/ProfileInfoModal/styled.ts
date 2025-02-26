import styled from "styled-components";

export const AvatarWrapper = styled.div`
  width: 12em;
  height: 12em;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0em 2em 0em;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 30em;
  min-width: 30em;
  padding: 1em;
  background-color: white;
  border-radius: 10px;
`;

export const UploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  border-radius: 0.3em;
  border: none;
  background-color: var(--ig-blue);
  color: var(--ig-white);
  padding: 0em 1em;
  margin: 0.75em;
  cursor: pointer;
  input {
    display: none;
  }
  font-size: 0.8em;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  height: fit-content;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 100%;
`;

export const InputField = styled.textarea`
  border: 0.0625em solid var(--ig-medium-grey);
  border-radius: 0.4em;
  height: 6em;
  resize: none;
  margin-top: 0.625em;
  min-width: 100%;
  padding: 0.8em;
  font-size: 1em;
  line-height: 1.4;
`;

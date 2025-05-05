import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  padding: 0;
  min-width: 30em;
  min-height: 30em;
  max-width: 50em;
  max-height: 50em;
`;

export const MainContent = styled.div`
  margin: 1em 0em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start:
  align-items: flex-start;
  min-width: 15em;
  min-height: 15em;
  max-width: 15em;
  max-height: 15em;
  border: 1px solid green;
`;

export const ActionsSection = styled.div`
  display: flex;
`;

export const MaskContainer = styled.div`
  min-width: 30em;
  min-height: 30em;
  max-width: 30em;
  max-height: 30em;
  overflow: hidden;
  position: relative;
  margin: 1em;
  padding: 1em;
`;

export const MaskedImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
`;

export const InputField = styled.input`
  padding: 10px;
  border: 1px solid var(--ig-divider-grey);
  border-radius: 5px;
  max-width: 8vw;
  height: 5vh;
`;

export const Caption = styled.div`
  display: flex;
  width: 90%;
  padding: 1em;
  height: fit-content;
  align-items: center;
  margin-top: 1em;
  border: 1px solid var(--ig-divider-grey);
`;

export const Username = styled.div`
  color: var(--ig-dark-blue)];
  min-width: fit-content;
  width: 50%;
`;

export const Button = styled.button`
  margin: 0.2em;
  height: 5vh;
  padding: 0.5em 1em;
  background-color: var(--ig-blue);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--ig-black);
  }
  &:disabled {
    background-color: var(--ig-medium-grey);
    cursor: not-allowed;
  }
`;

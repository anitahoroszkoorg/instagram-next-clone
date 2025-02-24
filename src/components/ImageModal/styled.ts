import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

export const ActionsSection = styled.div`
  display: flex;
  width: 100%;
  height: 10vh;
  flex-wrap: wrap;
`;

export const MaskContainer = styled.div`
  width: 30em;
  height: 30em;
  overflow: hidden;
  position: relative;
  margin: 0;
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
  width: 80%;
  margin-bottom: 10px;
`;

export const Caption = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  align-items: center;
`;

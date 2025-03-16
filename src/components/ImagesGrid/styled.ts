import styled from "styled-components";

export const FeedWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  overflow-x: hidden;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 30em;
  object-fit: contain;
  margin-bottom: 1.25em;
`;

export const CreateWizardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const CreateWizardActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const InputField = styled.input`
  padding: 0.6em;
  border: 1px solid var(--ig-divider-grey);
  border-radius: 0.3em;
  width: 80%;
  margin-bottom: 0.6em;
`;

export const Caption = styled.div`
  margin-top: 1.25em;
  font-size: 1em;
  text-align: center;
`;

export const ImgWrapper = styled.div`
  width: 20em;
  height: 20em;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1em 1em 1em;
`;

import styled from "styled-components";

export const ExploreContainer = styled.div`
  display: flex;
  margin-top: 15vh;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
`;

export const FeedWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  overflow-x: hidden;
  justify-content: center;
  margin-bottom: 10vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

export const Photobox = styled.img`
  margin: 0rem 1rem 1rem 1rem;
  width: 25em;
  height: 25em;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 10px;
  display: flex;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  margin-bottom: 20px;
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
  padding: 10px;
  border: 1px solid var(--ig-divider-grey);
  border-radius: 5px;
  width: 80%;
  margin-bottom: 10px;
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: var(--ig-blue);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export const EditButton = styled.button`
  padding: 10px 20px;
  background-color: var(--ig-blue);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: var(--ig-light-grey);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export const Caption = styled.div`
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  height: 100%;
  width: 40%;
  justify-content: center;
  padding: 0em 1em;
`;

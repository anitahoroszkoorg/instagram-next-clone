import styled from "styled-components";
import { keyframes } from "styled-components";

export const FeedWrapper = styled.div`
  display: flex;
  width: 90%;
  height: 80%;
  flex-wrap: wrap;
  overflow-x: hidden;
`;

const myAnim = keyframes`
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  border-radius: 8px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

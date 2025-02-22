import React, { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { BackDropContainer, ModalContent, ModalHeader } from "./styled";
import { CloseButton } from "@/shared/styled/styled";

interface Props {
  openModal?: boolean;
  closeModal?: () => void;
  modalTitle: string;
  children?: ReactNode;
}

export const Modal: React.FC<Props> = ({
  openModal,
  closeModal,
  modalTitle,
  children,
}) => {
  return (
    <BackDropContainer $visible={!!openModal}>
      <ModalContent>
        <ModalHeader>
          {modalTitle}
          <CloseButton onClick={closeModal}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </BackDropContainer>
  );
};

export default Modal;

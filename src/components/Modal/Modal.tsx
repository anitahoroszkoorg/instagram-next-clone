"use client";
import React, { ReactNode } from "react";
import { BackDropContainer, ModalContent, ModalHeader } from "./styled";

interface Props {
  openModal?: boolean;
  closeModal?: () => void;
  modalTitle?: string;
  children?: ReactNode;
}

export const Modal: React.FC<Props> = ({
  openModal,
  closeModal,
  modalTitle,
  children,
}) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal?.();
    }
  };
  return (
    <BackDropContainer $visible={!!openModal} onClick={handleBackdropClick}>
      <ModalContent data-testid="modal-content">
        <ModalHeader>{modalTitle}</ModalHeader>
        {children}
      </ModalContent>
    </BackDropContainer>
  );
};

export default Modal;

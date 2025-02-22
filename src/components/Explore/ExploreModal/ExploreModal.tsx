import React from "react";
import { PostDetails } from "@/shared/types/post";
import Modal from "@/components/Modal/Modal";
import { Photobox } from "@/shared/styled/styled";
import { Caption } from "./styled";

interface ExploreModalProps {
  image: PostDetails;
  onClose: () => void;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({
  onClose,
  image,
}) => {
  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Modal openModal={!!image} closeModal={onClose} modalTitle="Explore Image">
      <div onClick={handleModalContentClick}>
        <Photobox src={image.image} alt="Selected" />
        <Caption>{image.caption}</Caption>
      </div>
    </Modal>
  );
};

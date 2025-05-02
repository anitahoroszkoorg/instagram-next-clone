import Modal from "../Modal/Modal";
import { ImageComponent } from "../Image/Image";

interface ImageModalProps {
  postId: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ postId, onClose }) => {
  return (
    <Modal openModal={!!postId} closeModal={onClose}>
      <ImageComponent postId={postId} onClose={onClose} />
    </Modal>
  );
};

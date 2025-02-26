import { PostDetails } from "@/shared/types/post";
import Modal from "../Modal/Modal";
import useFetch from "@/app/hooks/useFetch";
import { ImageComponent } from "../Image/Image";

interface ImageModalProps {
  id: string;
  isProfileOwner?: boolean;
  isEditable?: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ id, onClose }) => {
  const { data } = useFetch<{ postDetails: PostDetails }>(`/api/post/${id}`);

  if (!data || !data.postDetails) return null;

  return (
    <Modal openModal={!!id} closeModal={onClose}>
      <ImageComponent postDetails={data.postDetails} />
    </Modal>
  );
};

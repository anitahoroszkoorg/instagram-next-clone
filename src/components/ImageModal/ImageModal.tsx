import Modal from "../Modal/Modal";
import { ImageComponent } from "../Image/Image";
import { useQuery } from "@tanstack/react-query";
import Error from "@/app/error";

interface ImageModalProps {
  id: string;
  isProfileOwner?: boolean;
  isEditable?: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ id, onClose }) => {
  const { data, error } = useQuery({
    queryKey: ["postDetails", id],
    queryFn: () => fetch(`/api/post/${id}`).then((res) => res.json()),
  });

  if (!data || !data.postDetails) return null;

  if (error) return <Error error={error} />;

  return (
    <Modal openModal={!!id} closeModal={onClose}>
      <ImageComponent postDetails={data.postDetails} onClose={onClose} />
    </Modal>
  );
};

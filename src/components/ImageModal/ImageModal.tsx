import Modal from "../Modal/Modal";
import { ImageComponent } from "../Image/Image";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface ImageModalProps {
  id: string;
  isProfileOwner?: boolean;
  isEditable?: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ id, onClose }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["postDetails", id],
    queryFn: () =>
      id
        ? fetch(`/api/post/${id}`).then((res) => res.json())
        : Promise.resolve(null),
    enabled: !!id,
  });

  useEffect(() => {
    if (!data?.postDetails && !isLoading) {
      onClose();
    }
  }, [data, isLoading, onClose]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading image</p>;
  if (!data?.postDetails) return null;

  return (
    <Modal openModal={!!id} closeModal={onClose}>
      <ImageComponent postDetails={data.postDetails} onClose={onClose} />
    </Modal>
  );
};

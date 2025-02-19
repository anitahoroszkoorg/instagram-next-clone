import { PostDetails } from "@/shared/types/post";
import { ModalOverlay } from "../Create/styled";
import { BackDropContainer } from "../Image/styled";
import {
  ModalContent,
  CreateWizardContainer,
  CreateWizardActions,
  InputField,
  Caption,
  SaveButton,
  EditButton,
  CloseButton,
  Image,
} from "./styled";

interface ExploreModalProps {
  image: PostDetails;
  onClose: () => void;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({
  onClose,
  image,
}) => {
  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  console.log(image);

  return (
    <BackDropContainer visible={!!image} onClick={onClose}>
      <ModalOverlay>
        <ModalContent onClick={handleModalContentClick}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Image src={image.image} alt="Selected" />
          <CreateWizardContainer>
            <CreateWizardActions>
              <Caption>{image.caption}</Caption>
            </CreateWizardActions>
          </CreateWizardContainer>
        </ModalContent>
      </ModalOverlay>
    </BackDropContainer>
  );
};

import styled from "styled-components";

export const PhotoDescription = styled.p`
  text-align: justify;
  text-justify: inter-word;
  font-size: 14px;
  margin: 0.5rem;
`;

export const PhotoboxFrame = styled.div`
  background: white;
  border-radius: 10px;
  width: 700px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin: 4rem 0rem 2rem 0rem;
`;

export const Photo = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt || "Image",
}))`
  width: 100%;
  height: 400px;
  object-fit: cover;
  background: var(--ig-medium-grey);
  object-fit: cover;
`;

export const PhotoDetails = styled.div`
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--ig-background-default);
  margin-right: 0.5rem;
  object-fit: cover;
`;

export const Username = styled.span`
  font-weight: bold;
  color: var(--ig-dark-blue);
`;

export const Caption = styled.p`
  font-size: 14px;
  color: var(--ig-black);
  margin: 0.5rem 0;
`;

export const TagsContainer = styled.div`
  font-size: 14px;
  margin-bottom: 1rem;
`;

export const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin-bottom: 1rem;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CommentsSection = styled.div`
  font-size: 14px;
`;

export const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  font-size: 14px;
  color: var(--ig-black);
  width: 100%;
`;

export const CommentsInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const StyledButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  background-color: var(--ig-blue);
  color: var(--ig-black);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  &:focus {
    outline: none;
    border-bottom: 1px solid var(--ig-dark-blue);
  }
  background-color: var(--ig-divider-grey);
  border-radius: 4px;
  color: var(--ig-black);
`;

export const Button = styled.button`
  width: 10%;
  border: none;
  height: 45px;
  border-radius: 3px;
  background-color: var(--ig-blue);
  color: white;
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled.form`
  width: 100%;
`;

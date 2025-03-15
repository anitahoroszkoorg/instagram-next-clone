import styled from "styled-components";

export const MaskContainer = styled.div`
  min-width: 25em;
  min-height: 25em;
  overflow: hidden;
  position: relative;
`;

export const MaskedImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 100%;
`;

export const PhotoDescription = styled.p`
  text-align: justify;
  text-justify: inter-word;
  font-size: 1em;
  margin: 0.5em;
`;

export const PhotoboxFrame = styled.div`
  background: white;
  border-radius: 0.6em;
  max-width: 30em;
  min-height: 40em;
  max-height: 45em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.25em 1em rgba(0, 0, 0, 0.2);
  margin: 4.5em 0 0 0;
`;

export const UserDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Photo = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt || "Image",
}))`
  width: 30em;
  height: 30em;
  object-fit: cover;
  background: var(--ig-medium-grey);
`;

export const PhotoDetails = styled.div`
  padding: 1em;
`;

export const PostTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  height: 1vh;
  background-color: blue;
`;

export const Avatar = styled.img`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: var(--ig-background-default);
  margin-right: 0.5em;
  object-fit: cover;
`;

export const Caption = styled.p`
  font-size: 1em;
  color: var(--ig-black);
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 0.8em;
  width: 100%;
  margin: 0.5em 1em 0.5em 2.5em;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CommentsSection = styled.div`
  font-size: 0.8em;
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  flex-wrap: nowrap;
  max-height: 10vh;
`;

export const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  border-bottom: 2px solid var(--ig-divider-grey);
  padding: 0.6em 1em;
  margin-bottom: 0.5em;
  border-radius: 0.5em;
  color: var(--ig-black);
  width: 100%;
  gap: 0.6em;
  & > p {
    text-align: left;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  & > p:nth-child(2) {
    flex: 2;
    max-width: 60%;
  }
  & > p:nth-child(1),
  & > p:nth-child(3) {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > button {
    flex: 0 0 auto;
    margin-left: 0.6em;
  }
`;

export const CommentsInputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 1em;
  gap: 1em;
  min-height: 5vh;
`;

export const Input = styled.input`
  width: 100%;
  height: 5vh;
  padding: 0.6em;
  border: none;
  font-size: 0.8em;
  &:focus {
    outline: none;
    border-bottom: 1px solid var(--ig-blue);
  }
  border-radius: 0.25em;
  color: var(--ig-black);
  background-color: var(--ig-background-default);
`;

export const Button = styled.button`
  all: unset;
`;

export const StyledForm = styled.form`
  width: 100%;
`;

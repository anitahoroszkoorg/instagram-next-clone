import styled from "styled-components";

export const Caption = styled.p`
  font-size: 1em;
  color: var(--ig-black);
  margin: 0em 0.5em;
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 0.8em;
  width: 100%;
  margin: 0.5em 1em 0.5em 2.5em;
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
  align-items: center;
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

export const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  gap: 1em;
`;

export const Input = styled.input`
  width: 100%;
  height: 5vh;
  padding: 0.6em;
  margin: 0em 1em;
  border: none;
  font-size: 0.8em;
  &:focus {
    outline: none;
    border-bottom: 1px solid var(--ig-blue);
  }
  border-radius: 0.25em;
  color: var(--ig-black);
  background-color: var(--ig-background-default);
  align-items: center;
`;

export const Button = styled.button`
  all: unset;
`;

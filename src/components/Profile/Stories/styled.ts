import styled from "styled-components";

export const InstaStoriesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  overflow-x: auto;
  overflow-y: hidden;
  max-height: 20vh;
  padding: 0.6em 0;
  justify-content: space-between;
`;

export const Instastory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const InstastoryImg = styled.img`
  display: flex;
  width: 2em;
  height: 2em;
  border-radius: 100%;
  margin: 0.3em;
  object-fit: cover;
`;

export const AddHighlight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  border-radius: 100%;
  background: white;
  border: 1px solid var(--ig-light-grey);
  margin: 0.3em 0.3em 0 0.3em;
  cursor: pointer;
  position: relative;
  box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.1);
  font-size: 1.5em;
  font-weight: bold;
  color: var(--ig-light-grey);
  &::after {
    content: "";
    position: absolute;
    width: 2em;
    height: 2em;
    border-radius: 100%;
    border: 2px solid var(--ig-light-grey);
  }
`;

export const Label = styled.p`
  color: var(--ig-dark-grey);
  font-size: 0.75em;
  margin: 1em 0em;
`;

import styled from "styled-components";

export const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--ig-divider-grey);
  height: 3em;
  border-radius: 0.6em;
  width: 25em;
  margin: 1em 0em 0em 1em;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 1em;
  background: transparent;
  outline: none;
`;

export const StyledSearchIcon = styled.div`
  margin-right: 0.3em;
`;

export const ResultsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style-type: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 0.6em;
`;

export const ResultItem = styled.li`
  padding: 0.8em;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

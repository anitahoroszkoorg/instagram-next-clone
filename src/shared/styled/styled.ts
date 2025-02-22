import styled from "styled-components";

export const Photobox = styled.img`
  margin: 0rem 1rem 1rem 1rem;
  width: 25em;
  height: 25em;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 10px;
  display: flex;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 0.625em;
  right: 0.625em;
  cursor: pointer;
  font-size: 1.25em;
  color: var(--ig-black);
`;

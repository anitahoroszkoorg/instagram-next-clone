import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--ig-white);
  text-align: center;
`;

export const Message = styled.h1`
  color: var(--ig-dark-blue);
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

export const Button = styled.button`
  background-color: var(--ig-blue);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

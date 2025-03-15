import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 4em;
  background: var(--ig-dark-blue);
  color: var(--ig-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1em;
  position: fixed;
  bottom: 0;
  left: 0;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const FooterLinks = styled.nav`
  display: flex;
  gap: 1em;
  a {
    color: var(--ig-white);
    text-decoration: none;
    font-size: 0.8em;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: var(--ig-blue);
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CopyrightText = styled.p`
  font-size: 0.8em;
  @media (max-width: 768px) {
    margin-top: 0.5em;
  }
`;

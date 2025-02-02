import styled from "styled-components";

export const InstaStoriesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  overflow-x: auto;
  overflow-y: hidden;
  max-height: 20vh;
  padding: 10px 0px;
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
  width: 60px;
  height: 60px;
  border-radius: 100%;
  margin: 0.5rem;
`;

export const AddHighlight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background: white;
  border: 2px solid var(--ig-light-grey);
  margin: 0.5rem 0.5rem 0rem 0.5rem;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 24px;
  font-weight: bold;
  color: var(--ig-light-grey);

  &::after {
    content: "";
    position: absolute;
    width: 65px;
    height: 65px;
    border-radius: 100%;
    border: 2px solid var(--ig-light-grey);
  }
`;

export const Label = styled.p`
  color: var(--ig-dark-grey);
  font-size: 12px;
`;

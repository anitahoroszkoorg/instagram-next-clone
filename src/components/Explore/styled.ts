import styled from "styled-components";

export const ExploreContainer = styled.div`
  display: flex;
  margin-top: 15vh;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
`;

export const FeedWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  overflow-x: hidden;
  justify-content: flex-start;
  margin-bottom: 10vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  height: 100%;
  width: 40%;
  justify-content: center;
  padding: 0em 1em;
`;

export const ImgWrapper = styled.div`
  width: 25em;
  height: 25em;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1em 1em 1em;
`;

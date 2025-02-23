import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fafafa;
`;

export const Card = styled.div`
  width: 44em;
  height: 34em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0.2em;
  -webkit-box-shadow: 0em 0em 2em -1em rgba(66, 68, 90, 0.61);
  -moz-box-shadow: 0em 0em 2em -1em rgba(66, 68, 90, 0.61);
  box-shadow: 0em 0em 2em -1em rgba(66, 68, 90, 0.61);
`;

export const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 300;
  margin: 0em 0em 1.25em 0em;
  padding: 0.6em;
`;

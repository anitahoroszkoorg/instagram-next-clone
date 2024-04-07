import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fafafa;
`;

export const Card = styled.div`
  width: 700px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 3px;
  -webkit-box-shadow: -0px 0px 33px -14px rgba(66, 68, 90, 0.61);
  -moz-box-shadow: -0px 0px 33px -14px rgba(66, 68, 90, 0.61);
  box-shadow: -0px 0px 33px -14px rgba(66, 68, 90, 0.61);
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin: 0px 0px 20px 0px;
  padding: 10px;
`;

export const ForgotPassword = styled.a`
  font-size: 14px;
  color: #2196f3;
  text-decoration: none;
  margin-top: 25px;
  &:hover {
    text-decoration: underline;
  }
`;

export const SignUp = styled.a`
  font-size: 14px;
  color: #999;
  text-decoration: none;
  margin-top: 25px;
  &:hover {
    text-decoration: underline;
  }
`;

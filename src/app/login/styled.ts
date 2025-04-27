import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  height: auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(10px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Title = styled.h1`
  font-size: 1em;
  font-weight: 400;
  color: white;
  padding: 0.5empx;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 0.8empx;
  border: 1px solid white;
  border-radius: 25px;
  font-size: 1em;
  margin-bottom: 1em;
  outline: none;
  background-color: transparent;
  color: white;
  placeholder-color: white;
  transition: all 0.3s ease;
  &:focus {
    box-shadow: 0 0 10px rgba(33, 150, 243, 0.5);
  }
  &::placeholder {
    color: white;
  }
`;

export const ForgotPassword = styled.a`
  font-size: 0.8em;
  color: #2196f3;
  text-decoration: none;
  margin-top: 1em;
  &:hover {
    text-decoration: underline;
  }
`;

export const SignUp = styled.a`
  font-size: 0.8em;
  color: white;
  text-decoration: none;
  margin-top: 1em;
  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.5em;
  color: red;
  margin-top: 0.5em;
`;

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Background = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    #fcaf45,
    #f77737,
    #e1306c,
    #833ab4,
    #fd1d1d
  );
  background-size: 400% 400%;
  background-position: 50% 50%;
  z-index: 0;
  }
`;

export const Glass = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
  pointer-events: none;
`;
export const Logo = styled.p`
  position: relative;
  color: white;
  font-size: 2em;
  text-align: center;
  z-index: 2;
  margin: 0em 0em 1em 0em;
`;

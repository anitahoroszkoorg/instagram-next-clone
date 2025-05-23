import styled from "styled-components";

export const HeaderWrapper = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 4.5em;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
`;

export const LogoWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 1rem;
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 6.25em;
  height: 2em;
  margin: 1em 0.625em 0 0;
  overflow: hidden;
`;

export const Icon = styled.div`
  margin: 1.5em;
`;

export const Button = styled.button`
  height: 2rem;
  border-radius: 0.3em;
  border: none;
  margin: 1.25em;
  padding: 0.5em;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 1rem;
  padding: 1rem;
  justify-content: space-around;
`;

export const Avatar = styled.div`
  width: 3em;
  height: 3em;
  border-radius: 50%;
  padding: 1em 0em;
  margin-top: 0.5em;
  background: linear-gradient(
    45deg,
    #fcaf45,
    #f77737,
    #e1306c,
    #833ab4,
    #fd1d1d
  );
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 50%;
    width: 2.6em;
    height: 2.6em;
    object-fit: cover;
  }
`;

import styled from "styled-components";

export const HeaderWrapper = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 120px;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
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
  width: 100px;
  height: 30px;
  margin: 15px 10px 0px 0px;
  overflow: hidden;
`;

export const Icon = styled.div`
  margin: 25px;
`;

export const Button = styled.button`
  height: 2rem;
  border-radius: 5px;
  border: none;
  margin: 20px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 1rem;
  padding: 1rem;
  justify-content: space-around;
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 3px;
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
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

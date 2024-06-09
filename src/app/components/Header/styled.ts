import styled from "styled-components";

export const HeaderWrapper = styled.header`
  postition: fixed;
  display: flex;
  background-color: white;
  width: 100%;
  height: 12vh;
  margin-left: 2rem;
  align-items: space-around;
  justify-content: space-between;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: space-around;
  padding: 1rem;
  overflow-y: hidden;
  overflow-x: hidden;
`;
export const IconsWrapper = styled.div`
  display: flex;
  align-items: space-between;
  overflow-y: hidden;
  overflow-x: hidden;
  margin-right: 5rem;
`;

export const Logo = styled.img`
  width: 100px;
  height: 30px;
  margin: 15px 10px 0px 0px;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const Avatar = styled.div`
  border-radius: 100%;
  width: 50px;
  height: 50px;
  overflow-y: hidden;
  overflow-x: hidden;
  margin: 10px;
`;

export const Icon = styled.div`
  margin: 25px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  margin-right: 2rem;
  padding: 1remś;
  justify-content: space-around;
`;

export const Button = styled.button`
  height: 2rem;
  border-radius: 5px;
  border: none;
  margin-top: 20px;
`;

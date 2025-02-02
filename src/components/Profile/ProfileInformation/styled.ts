import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1em;
  width: 28vw;
  overflow: hidden;
  position: fixed;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

export const Username = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 100%;
  margin: 10px 0px;
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 4px;
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
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 10px 0px;
`;

export const Stats = styled.button`
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
  all: unset;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

interface ButtonProps {
  isFollowing: boolean;
}

export const FollowButton = styled.button<ButtonProps>`
  height: 2rem;
  background-color: ${(props) =>
    props.isFollowing ? "var( --ig-light-grey)" : "var(--ig-blue)"};
  color: ${(props) =>
    props.isFollowing ? "var(--ig-black)" : " var(--ig-white)"};
  margin: 1rem;
  border-radius: 5px;
  justify-content: center;
  border: none;
  width: 100%;
`;

export const MessageButton = styled.button`
  height: 2rem;
  background-color: var(--ig-light-grey);
  color: var(--ig-black);
  margin: 1rem;
  border-radius: 5px;
  justify-content: center;
  border: none;
  width: 100%;
`;

export const ProfilePicture = styled.img`
  width: 200px;
  height: 70px;
  border-radius: 100%;
`;

export const Bio = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Name = styled.p`
  margin: 10px 0px 0px 0px;
`;

export const ProfileDescription = styled.p`
  font-weight: light;
  margin: 20px 0px;
`;

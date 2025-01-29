import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  font-size: 1em;
  border-radius: 3px;
  width: 10vw%;
  height: 100%;
  overflow: hidden;
  position: fixed;
`;

export const Username = styled.div`
  font-weight: bold;
  font-size: 14px;
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

export const Stats = styled.p`
  font-size: 14px;
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
  background-color: ${(props) => (props.isFollowing ? "lightgrey" : "#458eff")};
  color: ${(props) => (props.isFollowing ? "black" : "white")};
  margin: 1rem;
  border-radius: 5px;
  justify-content: center;
  border: none;
  width: 100%;
`;

export const MessageButton = styled.button`
  height: 2rem;
  background-color: lightgrey;
  color: white;
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

export const InstaStoriesContainer = styled.div`
  display: flex;
  width: 22vw;
  flex-wrap: wrap;
  overflow-y: auto;
  margin: 1rem;
`;

export const Instastory = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  background-color: lightblue;
  border-radius: 100%;
  margin: 0.5rem;
`;

export const InstastoryCaption = styled.p``;

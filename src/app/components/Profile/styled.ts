import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  font-size: 1em;
  border-radius: 3px;
  width: 25vw;
  height: 100%;
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 100%;
`;

export const ProfilePicture = styled.img`
  border-width: 50px;
  border-style: solid;
  border-image: linear-gradient(to right, magenta, orange) 1;
  width: 70px;
  height: 70px;
  border-radius: 100%;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  flex-direction: column;
`;

export const Stats = styled.p`
  width: 10px;
`;
export const StatsNumbers = styled.p`
  width: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;
interface ButtonProps {
  isFollowing: boolean;
}

export const Button = styled.button<ButtonProps>`
  height: 2rem;
  background-color: ${(props) => (props.isFollowing ? "lightgrey" : "#458eff")};
  color: ${(props) => (props.isFollowing ? "black" : "white")};
  margin: 1rem;
  border-radius: 5px;
  justify-content: center;
  border: none;
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
  margin 0.2rem;
`;

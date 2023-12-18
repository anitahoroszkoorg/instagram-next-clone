import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  font-size: 1em;
  border-radius: 3px;
  width: 25vw;
  height: 100%;
  justify-content: center;
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 100%;
`;

export const ProfilePicture = styled.img`
  border-style: solid;
  border-image: linear-gradient(to right, magenta, orange) 1;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  justify-content: center;
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

export const Button = styled.button`
  height: 2rem;
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

export const FeedWrapper = styled.div`
  display: flex;
  font-size: 1em;
  border-radius: 3px;
  width: 75vw;
  height: 100%;
  flex-wrap: wrap;
  overflow-y: auto;
  padding-bottom: 20px;
`;

export const Photobox = styled.img`
  margin: 2px;
  padding: 1rem;
  width: 250px;
  height: 250px;
`;
interface BackDropProps {
  show: boolean;
}

export const BackDropContainer = styled.div<BackDropProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  // display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const PhotoboxFrame = styled.div`
  width: 55vw;
  height: 65vh;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const PhotoDetails = styled.div`
  width: 350px;
  height: 350px;
  margin: 2px;
  padding: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Photo = styled.img`
  margin: 3px;
  padding: 1rem;
  width: 350px;
  height: 350px;
  object-fit: cover;
`;

export const Avatar = styled.img`
  border-radius: 100%;
  width: 30px;
  height: 30px;
`;

export const PhotoDescription = styled.p`
  text-align: justify;
  text-justify: inter-word;
  font-size: 0.8rem;
  margin: 0.5rem;
`;

export const TagsContainer = styled.div`
  margin: 0.5rem;
  border-top: 0.5px solid black;
  width: 21vw;
  height: 10vh;
  background-color: lightblue;
`;
export const CommentsSection = styled.div`
  margin: 0.5rem;
  border-top: 0.5px solid black;
  width: 21vw;
  height: 20vh;
  background-color: whitesmoke;
`;
export const LikeSection = styled.div`
  margin: 0.5rem;
  border-top: 0.5px solid black;
  width: 21vw;
  background-color: whitesmoke;
`;

export const Icon = styled.div`
  margin: 5px;
  font-weight: 300;
`;

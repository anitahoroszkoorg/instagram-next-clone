import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1em;
  width: 28vw;
  overflow: hidden;
  position: fixed;
  border-radius: 0.6em;
  padding: 1.25em;
  box-shadow: 0 0.25em 0.9em rgba(0, 0, 0, 0.2);
`;

export const Username = styled.div`
  font-weight: bold;
  font-size: 0.8em;
  margin-left: 0.6em;
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 100%;
  margin: 0.6em 0;
`;

export const Avatar = styled.div`
  width: 5em;
  height: 5em;
  border-radius: 50%;
  padding: 0.25em;
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
    width: 5em;
    height: 5em;
    object-fit: cover;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 0.625em 0;
`;

export const Stats = styled.button`
  font-size: 0.8em;
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
  $isfollowing: boolean;
}

export const FollowButton = styled.button<ButtonProps>`
  height: 2em;
  background-color: ${(props) =>
    props.$isfollowing ? "var( --ig-light-grey)" : "var(--ig-blue)"};
  color: ${(props) =>
    props.$isfollowing ? "var(--ig-black)" : " var(--ig-white)"};
  margin: 1em;
  border-radius: 0.3em;
  justify-content: center;
  border: none;
  width: 100%;
`;

export const MessageButton = styled.button`
  height: 2em;
  background-color: var(--ig-light-grey);
  color: var(--ig-black);
  margin: 1em;
  border-radius: 0.3em;
  justify-content: center;
  border: none;
  width: 100%;
`;

export const ProfilePicture = styled.img`
  width: 12.5em;
  height: 4em;
  border-radius: 100%;
  object-fit: cover;
`;

export const Bio = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.6em;
`;

export const Name = styled.p`
  margin: 0.6em 0 0 0;
`;

export const ProfileDescription = styled.p`
  font-weight: light;
  margin: 1.25em 0;
`;

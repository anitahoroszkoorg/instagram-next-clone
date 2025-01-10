import styled from "styled-components";

export const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  border-radius: 3px;
  width: 90%;
  height: 100%;
  flex-wrap: wrap;
  margin: 5rem 2rem 5rem 5rem;
  overflow: auto;
  padding: 1rem;
`;
export const Photobox = styled.img`
  margin: 2px;
  padding: 1rem;
  width: 250px;
  height: 250px;
`;

export const PhotoDescription = styled.p`
  text-align: justify;
  text-justify: inter-word;
  font-size: 0.8rem;
  margin: 0.5rem;
`;

export const BackDropContainer = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const PhotoboxFrame = styled.div`
  background: white;
  border-radius: 10px;
  width: 700px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin: 4rem 0rem 2rem 0rem;
`;

export const Photo = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  background: #f4f4f4;
`;

export const PhotoDetails = styled.div`
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ccc;
  margin-right: 0.5rem;
`;

export const Username = styled.span`
  font-weight: bold;
  color: #333;
`;

export const Caption = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
`;

export const TagsContainer = styled.div`
  font-size: 0.9rem;
  color: #007aff;
  margin-bottom: 1rem;
`;

export const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CommentsSection = styled.div`
  font-size: 0.9rem;
  color: #999;
`;

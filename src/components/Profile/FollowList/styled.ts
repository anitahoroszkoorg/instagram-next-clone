import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background: var(--ig-white);
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid var(--ig-divider-grey);
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px;
  background: ${(props) =>
    props.$active ? "var(--ig-light-grey)" : "var(--ig-white)"};
  border: none;
  cursor: pointer;
  &:hover {
    background: var(--ig-divider-grey);
  }
`;

export const List = styled.div`
  overflow-y: auto;
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid var(--ig-divider-grey);
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

export const Username = styled.div`
  flex: 1;
  text-decoration: none !important;
`;

export const FollowButton = styled.button<{ $following: boolean }>`
  height: 2em;
  border: none;
  background-color: ${(props) =>
    props.$following ? "var( --ig-light-grey)" : "var(--ig-blue)"};
  color: ${(props) =>
    props.$following ? "var(--ig-black)" : " var(--ig-white)"};
  color: var(--ig-white);
  border-radius: 5px;
  cursor: pointer;
`;

export const Button = styled.button`
  all: unset;
`;

export const EmptyRow = styled.div`
  padding: 20px;
  text-align: center;
  color: var(--ig-dark-grey);
  font-size: 14px;
  border-bottom: 1px solid var(--ig-divider-grey);
`;

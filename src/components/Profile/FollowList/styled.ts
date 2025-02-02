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

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  font-weight: bold;
  background: ${(props) =>
    props.active ? "var(--ig-light-grey)" : "var(--ig-white)"};
  border: none;
  cursor: pointer;
  &:hover {
    background: var(--ig-light-grey);
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
`;

export const Username = styled.div`
  flex: 1;
  font-weight: bold;
`;

export const FollowButton = styled.button<{ following: boolean }>`
  padding: 6px 12px;
  border: none;
  background: ${(props) =>
    props.following ? "var(--ig-red)" : "var(--ig-blue)"};
  color: var(--ig-white);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.following ? "#cc0000" : "var(--ig-dark-blue)"};
  }
`;

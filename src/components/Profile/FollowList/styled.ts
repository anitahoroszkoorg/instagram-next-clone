import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  border-radius: 1em;
  box-shadow: 0 0.25em 0.9em rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background: var(--ig-white);
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 0.125em solid var(--ig-divider-grey);
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.75em;
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
  padding: 0.6em;
  border-bottom: 1px solid var(--ig-divider-grey);
`;

export const ProfileImage = styled.img`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  margin-right: 0.6em;
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
    props.$following ? "var(--ig-black)" : "var(--ig-white)"};
  border-radius: 0.3em;
  cursor: pointer;
`;

export const Button = styled.button`
  all: unset;
`;

export const EmptyRow = styled.div`
  padding: 1.25em;
  text-align: center;
  color: var(--ig-dark-grey);
  font-size: 0.8em;
  border-bottom: 1px solid var(--ig-divider-grey);
`;

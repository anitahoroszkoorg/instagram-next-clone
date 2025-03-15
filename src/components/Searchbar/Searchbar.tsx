"use client";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import {
  StyledSearchBar,
  StyledSearchIcon,
  Input,
  ResultsList,
  ResultItem,
} from "./styled";
import { fetchUsers } from "@/app/utils/fetchUsers";
import { User } from "@/globals";

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const debouncedSetQuery = debounce((value: string) => {
    setQuery(value);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetQuery(e.target.value);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", query],
    queryFn: () => fetchUsers(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <StyledSearchBar>
        <StyledSearchIcon>
          <SearchIcon color="secondary" style={{ color: "grey" }} />
        </StyledSearchIcon>
        <Input
          type="text"
          onChange={handleInputChange}
          placeholder="Search users"
        />
      </StyledSearchBar>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && data.users?.length > 0 && (
        <ResultsList>
          {data.users.map((user: User) => (
            <ResultItem key={user.user_id}>{user.username}</ResultItem>
          ))}
        </ResultsList>
      )}
      {data && data.users?.length === 0 && (
        <ResultsList>
          <ResultItem>No users found.</ResultItem>
        </ResultsList>
      )}
    </div>
  );
};

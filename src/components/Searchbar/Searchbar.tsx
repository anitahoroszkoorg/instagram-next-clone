import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  StyledSearchBar,
  StyledSearchIcon,
  Input,
  ResultsList,
  ResultItem,
} from "./styled";
import { fetchData } from "@/app/lib/fetchData";
import { User } from "@/globals";

export const SearchBar = () => {
  return (
    <div>
      <StyledSearchBar>
        <StyledSearchIcon>
          <SearchIcon color="secondary" />
        </StyledSearchIcon>
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search users"
        />
      </StyledSearchBar>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {results && results.length > 0 && (
        <ResultsList>
          {results.map((user) => (
            <ResultItem key={user.user_id}>{user.username}</ResultItem>
          ))}
        </ResultsList>
      )}
    </div>
  );
};

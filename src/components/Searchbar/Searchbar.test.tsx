import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { act } from "react-dom/test-utils";
import { SearchBar } from "./Searchbar";

jest.mock("@tanstack/react-query");
jest.mock("@/app/utils/fetchUsers");

const mockUsers = [
  { user_id: "1", username: "user1" },
  { user_id: "2", username: "user2" },
];

describe("SearchBar Component", () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders search bar with icon and input", () => {
    render(<SearchBar />);
    expect(screen.getByTestId("Searchbar")).toBeInTheDocument();
    expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search users")).toBeInTheDocument();
  });

  it("triggers search after debounce", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { users: mockUsers },
      isLoading: false,
      error: null,
    });

    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search users");

    await act(async () => {
      fireEvent.change(input, { target: { value: "test" } });
      await new Promise((r) => setTimeout(r, 350));
    });

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["users", "test"],
        enabled: true,
      }),
    );
  });

  it("shows loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<SearchBar />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: "Search failed" },
    });

    render(<SearchBar />);
    expect(screen.getByText("Search failed")).toBeInTheDocument();
  });

  it("displays search results", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { users: mockUsers },
      isLoading: false,
      error: null,
    });

    render(<SearchBar />);
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });

  it("shows 'No users found' when empty results", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { users: [] },
      isLoading: false,
      error: null,
    });

    render(<SearchBar />);
    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });

  it("doesn't show results when query is empty", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { users: mockUsers },
      isLoading: false,
      error: null,
    });

    render(<SearchBar />);
    expect(screen.queryByText("user1")).not.toBeInTheDocument();
  });
});

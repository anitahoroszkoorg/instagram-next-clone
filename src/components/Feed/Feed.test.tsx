import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Feed } from "./Feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { ImageComponent } from "../Image/Image";

jest.mock("@tanstack/react-query");
jest.mock("react-intersection-observer");
jest.mock("../Image/Image");
jest.mock("@/app/utils/fetchPosts");

describe("Feed Component", () => {
  const mockUseInView = useInView as jest.Mock;
  const mockUseInfiniteQuery = useInfiniteQuery as jest.Mock;

  beforeEach(() => {
    (ImageComponent as jest.Mock).mockImplementation(({ postId }) => (
      <div>Mock Image {postId}</div>
    ));
    mockUseInView.mockReturnValue({ ref: jest.fn(), inView: false });
    mockUseInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          { postIds: ["1", "2"], nextCursor: "cursor1" },
          { postIds: ["3", "4"], nextCursor: null },
        ],
      },
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      status: "success",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    mockUseInfiniteQuery.mockReturnValueOnce({
      status: "pending",
    });
    render(<Feed />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseInfiniteQuery.mockReturnValueOnce({
      status: "error",
      error: { message: "Failed to load" },
    });
    render(<Feed />);
    expect(screen.getByText("Error: Failed to load")).toBeInTheDocument();
  });

  it("renders posts when successful", () => {
    render(<Feed />);
    expect(screen.getByText("Mock Image 1")).toBeInTheDocument();
    expect(screen.getByText("Mock Image 2")).toBeInTheDocument();
  });

  it("triggers fetchNextPage when scrolled into view", async () => {
    const mockFetchNextPage = jest.fn();
    mockUseInfiniteQuery.mockReturnValue({
      data: { pages: [{ postIds: ["1"], nextCursor: "cursor1" }] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      status: "success",
    });

    render(<Feed />);
    mockUseInView.mock.calls[0][0].onChange(true);

    await waitFor(() => {
      expect(mockFetchNextPage).toHaveBeenCalled();
    });
  });

  it("shows correct button text states", () => {
    mockUseInfiniteQuery.mockReturnValueOnce({
      data: { pages: [] },
      isFetchingNextPage: true,
      hasNextPage: true,
      status: "success",
    });
    const { rerender } = render(<Feed />);
    expect(screen.getByText("Loading older posts...")).toBeInTheDocument();

    mockUseInfiniteQuery.mockReturnValueOnce({
      data: { pages: [] },
      isFetchingNextPage: false,
      hasNextPage: true,
      status: "success",
    });
    rerender(<Feed />);
    expect(screen.getByText("Load More")).toBeInTheDocument();

    mockUseInfiniteQuery.mockReturnValueOnce({
      data: { pages: [] },
      isFetchingNextPage: false,
      hasNextPage: false,
      status: "success",
    });
    rerender(<Feed />);
    expect(screen.getByText("No older posts.")).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Explore } from "./Explore";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { SearchBar } from "../Searchbar/Searchbar";
import { ImageModal } from "../ImageModal/ImageModal";

jest.mock("@tanstack/react-query");
jest.mock("next-auth/react");
jest.mock("../Searchbar/Searchbar");
jest.mock("../ImageModal/ImageModal");
jest.mock("@/app/utils/fetchPosts");

describe("Explore Component", () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockUseSession = useSession as jest.Mock;

  beforeEach(() => {
    (SearchBar as jest.Mock).mockReturnValue(<div>SearchBar</div>);
    (ImageModal as jest.Mock).mockReturnValue(<div>ImageModal</div>);
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: "1",
        },
      },
    });
    mockUseQuery.mockReturnValue({
      data: {
        posts: [
          {
            post_id: "1",
            image: "test.jpg",
          },
        ],
      },
      error: null,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when not logged in", () => {
    mockUseSession.mockReturnValueOnce({ data: null });
    const { container } = render(<Explore />);
    expect(container.firstChild).toBeNull();
  });

  it("renders loading state", () => {
    mockUseQuery.mockReturnValueOnce({ isLoading: true });
    render(<Explore />);
    expect(screen.getAllByTestId("skeleton").length).toBe(4);
  });

  it("renders posts when data is available", () => {
    render(<Explore />);
    expect(screen.getByAltText("Post")).toBeInTheDocument();
  });

  it("shows no posts message when empty", () => {
    mockUseQuery.mockReturnValueOnce({ data: { posts: [] } });
    render(<Explore />);
    expect(screen.getByText("No posts available")).toBeInTheDocument();
  });

  it("opens image modal when image clicked", () => {
    render(<Explore />);
    fireEvent.click(screen.getByAltText("Post"));
    expect(screen.getByText("ImageModal")).toBeInTheDocument();
  });

  it("renders search bar", () => {
    render(<Explore />);
    expect(screen.getByText("SearchBar")).toBeInTheDocument();
  });
});

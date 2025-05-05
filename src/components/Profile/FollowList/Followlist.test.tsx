import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useFollowData } from "@/app/hooks/useFollowData";
import FollowList from "./Followlist";

jest.mock("@/app/hooks/useFollowData");
jest.mock("react-toastify");

const mockUsers = [
  {
    user_id: "1",
    username: "user1",
    profile_picture: "/avatar1.jpg",
  },
  {
    user_id: "2",
    username: "user2",
    profile_picture: "/avatar2.jpg",
  },
];

describe("FollowList Component", () => {
  const mockSetActiveTab = jest.fn();

  beforeEach(() => {
    (useFollowData as jest.Mock).mockReturnValue({
      data: {
        followers: mockUsers,
        followed: mockUsers,
      },
      isLoading: false,
      isError: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders followers tab by default", () => {
    render(
      <FollowList
        setActiveTab={mockSetActiveTab}
        activeTab="followers"
        id="123"
        isProfileOwner={true}
      />,
    );
    expect(screen.getByText("Followers")).toBeInTheDocument();
    expect(screen.getByText("Following")).toBeInTheDocument();
  });

  it("switches between tabs when clicked", () => {
    render(
      <FollowList
        setActiveTab={mockSetActiveTab}
        activeTab="followers"
        id="123"
        isProfileOwner={true}
      />,
    );
    fireEvent.click(screen.getByText("Following"));
    expect(mockSetActiveTab).toHaveBeenCalledWith("Followed");
  });

  it("shows delete buttons for profile owner in followers tab", () => {
    render(
      <FollowList
        setActiveTab={mockSetActiveTab}
        activeTab="followers"
        id="123"
        isProfileOwner={true}
      />,
    );
    expect(screen.getAllByRole("button").length).toBe(mockUsers.length * 2);
  });

  it("doesn't show delete buttons for non-owners", () => {
    render(
      <FollowList
        setActiveTab={mockSetActiveTab}
        activeTab="followers"
        id="123"
        isProfileOwner={false}
      />,
    );
    expect(screen.getAllByRole("button").length).toBe(mockUsers.length);
  });

  it("displays empty state when no users", () => {
    (useFollowData as jest.Mock).mockReturnValueOnce({
      data: {
        followers: [],
        followed: [],
      },
      isLoading: false,
      isError: false,
    });

    render(
      <FollowList
        setActiveTab={mockSetActiveTab}
        activeTab="followers"
        id="123"
        isProfileOwner={true}
      />,
    );
    expect(screen.getByText("No followers.")).toBeInTheDocument();
  });
});

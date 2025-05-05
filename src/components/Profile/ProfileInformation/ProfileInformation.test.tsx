import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileInfo from "./ProfileInformation";
import { useProfileData } from "@/app/hooks/useProfileData";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { useFollowData } from "@/app/hooks/useFollowData";

jest.mock("@/app/hooks/useProfileData");
jest.mock("@/app/hooks/useFollowData");
jest.mock("@/app/hooks/useLoggedInUser");

const mockProfile = {
  user_id: "123",
  username: "testuser",
  full_name: "Test User",
  bio: "Test bio",
  profile_picture: null,
};

describe("ProfileInfo Component", () => {
  const mockSetActiveTab = jest.fn();

  beforeEach(() => {
    (useProfileData as jest.Mock).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      error: null,
    });
    (useFollowData as jest.Mock).mockReturnValue({
      data: { followers: [], followed: [] },
      isLoading: false,
      isError: false,
    });
    (useLoggedInUser as jest.Mock).mockReturnValue({
      data: { user_id: "456" },
    });
  });

  it("renders profile information", () => {
    render(
      <ProfileInfo
        setActiveTab={mockSetActiveTab}
        postsLength={5}
        slug="testuser"
        isProfileOwner={false}
      />,
    );

    expect(screen.getByText("@testuser")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Test bio")).toBeInTheDocument();
  });

  it("shows stats with correct counts", () => {
    render(
      <ProfileInfo
        setActiveTab={mockSetActiveTab}
        postsLength={10}
        slug="testuser"
        isProfileOwner={false}
      />,
    );

    expect(screen.getByText("10 Posts")).toBeInTheDocument();
    expect(screen.getByText("0 Followers")).toBeInTheDocument();
    expect(screen.getByText("0 Following")).toBeInTheDocument();
  });

  it("shows follow button for non-owners", () => {
    render(
      <ProfileInfo
        setActiveTab={mockSetActiveTab}
        postsLength={5}
        slug="testuser"
        isProfileOwner={false}
      />,
    );

    expect(screen.getByText("Follow")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  it("shows edit button for profile owner", () => {
    render(
      <ProfileInfo
        setActiveTab={mockSetActiveTab}
        postsLength={5}
        slug="testuser"
        isProfileOwner={true}
      />,
    );

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});

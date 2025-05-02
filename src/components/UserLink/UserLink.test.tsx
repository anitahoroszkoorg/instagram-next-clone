import { render, screen } from "@testing-library/react";
import { UserLink } from "./UserLink";
import "@testing-library/jest-dom";

describe("UserLink", () => {
  const mockUser = {
    username: "john_doe",
    user_id: "123",
    profile_image: "https://example.com/john.jpg",
  };

  it("renders the user's username", () => {
    render(<UserLink user={mockUser} />);
    expect(screen.getByText("john_doe")).toBeInTheDocument();
  });

  it("uses the user's profile image if provided", () => {
    render(<UserLink user={mockUser} />);
    const img = screen.getByAltText("john_doe's profile");
    expect(img).toHaveAttribute("src", mockUser.profile_image);
  });

  it("falls back to default avatar if no profile image is provided", () => {
    const userWithoutImage = { ...mockUser, profile_image: undefined };
    render(<UserLink user={userWithoutImage} />);
    const img = screen.getByAltText("john_doe's profile");
    expect(img).toHaveAttribute("src", "/avatar.jpeg");
  });

  it("links to the correct profile URL", () => {
    render(<UserLink user={mockUser} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/profile/${mockUser.user_id}`);
  });
});

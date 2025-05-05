import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { useSession, signOut } from "next-auth/react";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { redirect } from "next/navigation";

jest.mock("next-auth/react");
jest.mock("@/app/hooks/useLoggedInUser");
jest.mock("next/navigation");

describe("Header", () => {
  const mockUser = {
    user_id: "123",
    username: "testuser",
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: mockUser },
    });
    (useLoggedInUser as jest.Mock).mockReturnValue({
      data: mockUser,
    });
    (signOut as jest.Mock).mockImplementation(() => {});
    (signOut as jest.Mock).mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when not logged in", () => {
    (useSession as jest.Mock).mockReturnValueOnce({ data: null });
    const { container } = render(<Header />);
    expect(container.firstChild).toBeNull();
  });

  it("renders header elements when logged in", () => {
    render(<Header />);
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("Sign out")).toBeInTheDocument();
    expect(screen.getByAltText("User Avatar")).toBeInTheDocument();
  });

  it("contains all navigation icons", () => {
    render(<Header />);
    expect(screen.getAllByRole("link").length).toBe(4);
  });

  it("opens create modal when photo icon clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(screen.getByTestId("create-modal")).toBeInTheDocument();
  });

  it("calls signOut and redirect when sign out clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByText("Sign out"));
    expect(signOut).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith("/login");
  });

  it("links to user profile", () => {
    render(<Header />);
    const profileLink = screen.getAllByRole("link")[3];
    expect(profileLink).toHaveAttribute("href", `/profile/${mockUser.user_id}`);
  });
});

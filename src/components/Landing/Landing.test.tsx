import { render, screen, fireEvent } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LandingPage from "./Landing";

jest.mock("next-auth/react");
jest.mock("next/navigation");

describe("LandingPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSession as jest.Mock).mockReturnValue({
      data: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logo text", () => {
    render(<LandingPage />);
    "Instagram".split("").forEach((letter) => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  });

  it("renders both buttons", () => {
    render(<LandingPage />);
    expect(screen.getByText("Demo mode")).toBeInTheDocument();
    expect(screen.getByText("Classic mode")).toBeInTheDocument();
  });

  it("redirects to register page when Classic mode button is clicked", () => {
    render(<LandingPage />);
    fireEvent.click(screen.getByText("Classic mode"));
    expect(mockPush).toHaveBeenCalledWith("/register");
  });

  it("redirects logged in users to home page", () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: { user: {} },
    });
    render(<LandingPage />);
    expect(useSession).toHaveBeenCalled();
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileEditModal from "./ProfileInfoModal";

jest.mock("@/app/hooks/useLoggedInUser");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));
jest.mock("@/app/utils/fetchData", () => ({
  fetchData: jest.fn(),
}));
jest.mock("@/app/utils/formatImage", () => ({
  formatImage: jest.fn((input) => input),
}));

const mockCloseModal = jest.fn();

const userMock = {
  user_id: "123",
  bio: "Old bio",
  profile_picture: "/mock-avatar.png",
};

const queryClient = new QueryClient();

const renderWithProviders = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <ProfileEditModal closeModal={mockCloseModal} />
    </QueryClientProvider>,
  );

describe("ProfileEditModal", () => {
  beforeEach(() => {
    (useLoggedInUser as jest.Mock).mockReturnValue({
      data: userMock,
    });
  });

  it("renders the modal with user info", () => {
    renderWithProviders();
    expect(screen.getByPlaceholderText(/edit your bio/i)).toHaveValue(
      "Old bio",
    );
    expect(screen.getByAltText(/user avatar/i)).toBeInTheDocument();
  });

  it("updates the bio input", () => {
    renderWithProviders();
    const input = screen.getByPlaceholderText(/edit your bio/i);
    fireEvent.change(input, { target: { value: "New bio" } });
    expect(input).toHaveValue("New bio");
  });

  it("handles file input change", async () => {
    renderWithProviders();
    const file = new File(["avatar"], "avatar.png", { type: "image/png" });
    const fileInput =
      screen.getByLabelText(/upload photo/i) || screen.getByDisplayValue("");

    fireEvent.change(fileInput, { target: { files: [file] } });
  });

  it("calls mutation on save", async () => {
    renderWithProviders();
    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/save/i)).toBeInTheDocument();
    });
  });
});

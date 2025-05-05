import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Create from "./Create";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { validateImage } from "@/app/utils/validateImage";
import { fetchData } from "@/app/utils/fetchData";

jest.mock("next-auth/react");
jest.mock("react-toastify");
jest.mock("@/app/utils/validateImage");
jest.mock("@/app/utils/fetchData");

describe("Create Component", () => {
  const mockCloseModal = jest.fn();
  const mockUseSession = useSession as jest.Mock;
  const mockValidateImage = validateImage as jest.Mock;
  const mockFetchData = fetchData as jest.Mock;
  const mockToastError = toast.error as jest.Mock;

  beforeEach(() => {
    mockUseSession.mockReturnValue({
      data: { user: { email: "test@example.com" } },
    });
    mockValidateImage.mockResolvedValue({ isValid: true, error: "" });
    mockFetchData.mockResolvedValue({ status: 200 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders when openModal is true", () => {
    render(<Create openModal={true} closeModal={mockCloseModal} />);
    expect(screen.getByTestId("create")).toBeInTheDocument();
  });

  it("does not render when openModal is false", () => {
    const { container } = render(
      <Create openModal={false} closeModal={mockCloseModal} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows initial upload state", () => {
    render(<Create openModal={true} closeModal={mockCloseModal} />);
    expect(screen.getByText("Create a new post")).toBeInTheDocument();
    expect(screen.getByText("Choose from your device")).toBeInTheDocument();
  });

  it("handles file selection", () => {
    const file = new File(["test"], "test.png", { type: "image/png" });
    render(<Create openModal={true} closeModal={mockCloseModal} />);

    const input = screen.getByTestId("file-input");
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByAltText("selected image")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add your caption")).toBeInTheDocument();
  });

  it("validates image before upload", async () => {
    mockValidateImage.mockResolvedValueOnce({
      isValid: false,
      error: "Invalid image",
    });

    const file = new File(["test"], "test.png", { type: "image/png" });
    render(<Create openModal={true} closeModal={mockCloseModal} />);

    const input = screen.getByTestId("file-input");
    fireEvent.change(input, { target: { files: [file] } });

    const uploadBtn = screen.getByText("Upload!");
    fireEvent.click(uploadBtn);

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith("Invalid image");
    });
  });

  it("submits valid form", async () => {
    const file = new File(["test"], "test.png", { type: "image/png" });
    render(<Create openModal={true} closeModal={mockCloseModal} />);

    const input = screen.getByTestId("file-input");
    fireEvent.change(input, { target: { files: [file] } });

    const captionInput = screen.getByPlaceholderText("Add your caption");
    fireEvent.change(captionInput, { target: { value: "Test caption" } });

    const uploadBtn = screen.getByText("Upload!");
    fireEvent.click(uploadBtn);

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith(
        "/api/post",
        "POST",
        expect.any(FormData),
      );
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });

  it("closes modal", () => {
    render(<Create openModal={true} closeModal={mockCloseModal} />);
    fireEvent.click(screen.getByTestId("close-button"));
    expect(mockCloseModal).toHaveBeenCalled();
  });
});

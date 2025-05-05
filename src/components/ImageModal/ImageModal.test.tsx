import React from "react";
import { render } from "@testing-library/react";
import { ImageModal } from "./ImageModal";
import Modal from "../Modal/Modal";
import { ImageComponent } from "../Image/Image";

jest.mock("../Modal/Modal");
jest.mock("../Image/Image");

describe("ImageModal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    (Modal as jest.Mock).mockImplementation(({ children }) => (
      <div>{children}</div>
    ));
    (ImageComponent as jest.Mock).mockReturnValue(<div>Mock Image</div>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when postId is empty", () => {
    const { container } = render(
      <ImageModal postId="" onClose={mockOnClose} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders Modal and ImageComponent when postId exists", () => {
    render(<ImageModal postId="123" onClose={mockOnClose} />);

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        openModal: true,
        closeModal: mockOnClose,
      }),
      expect.anything(),
    );

    expect(ImageComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        postId: "123",
        onClose: mockOnClose,
      }),
      expect.anything(),
    );
  });

  it("passes correct props to children components", () => {
    render(<ImageModal postId="456" onClose={mockOnClose} />);

    const modalProps = (Modal as jest.Mock).mock.calls[0][0];
    expect(modalProps.openModal).toBe(true);
    expect(modalProps.closeModal).toBe(mockOnClose);

    const imageProps = (ImageComponent as jest.Mock).mock.calls[0][0];
    expect(imageProps.postId).toBe("456");
    expect(imageProps.onClose).toBe(mockOnClose);
  });
});

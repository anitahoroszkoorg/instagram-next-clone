import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("ModalComponent", () => {
  const mockCloseModal = jest.fn();

  const renderModal = (
    props: Partial<React.ComponentProps<typeof Modal>> = {},
  ) =>
    render(
      <Modal
        openModal={true}
        closeModal={mockCloseModal}
        modalTitle="Test Modal"
        {...props}
      >
        <div>Modal Content</div>
      </Modal>,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders when openModal is true", () => {
    renderModal();
    expect(screen.getByTestId("modal-content")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeVisible();
  });

  it("does not render when openModal is false", () => {
    renderModal({ openModal: false });
    expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
  });

  it("calls closeModal when clicking the backdrop", () => {
    renderModal();
    const backdrop = screen.getByTestId("modal-content").parentElement;
    fireEvent.click(backdrop!);
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("does not call closeModal when clicking modal content", () => {
    renderModal();
    fireEvent.click(screen.getByTestId("modal-content"));
    expect(mockCloseModal).not.toHaveBeenCalled();
  });

  it("displays the modalTitle when provided", () => {
    renderModal({ modalTitle: "Custom Title" });
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders without a modalTitle if not provided", () => {
    renderModal({ modalTitle: undefined });
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders children content", () => {
    renderModal({ children: <div>Custom Child</div> });
    expect(screen.getByText("Custom Child")).toBeInTheDocument();
  });

  it("does not throw if closeModal is undefined", () => {
    renderModal({ closeModal: undefined });
    fireEvent.click(screen.getByTestId("modal-content").parentElement!);
  });
});

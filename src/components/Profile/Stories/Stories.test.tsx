import React from "react";
import { render, screen } from "@testing-library/react";
import { Stories } from "./Stories";

describe("Stories component", () => {
  const mockStories = [
    { src: "image1.jpg", label: "Story 1" },
    { src: "image2.jpg", label: "Story 2" },
  ];

  it("renders 'Add' button when user is profile owner", () => {
    render(<Stories isProfileOwner={true} stories={[]} />);
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("does not render 'Add' button when user is not profile owner", () => {
    render(<Stories isProfileOwner={false} stories={[]} />);
    expect(screen.queryByText("Add")).not.toBeInTheDocument();
    expect(screen.queryByText("+")).not.toBeInTheDocument();
  });

  it("renders story items when stories are provided", () => {
    render(<Stories isProfileOwner={false} stories={mockStories} />);
    expect(screen.getByText("Story 1")).toBeInTheDocument();
    expect(screen.getByText("Story 2")).toBeInTheDocument();
    expect(screen.getAllByAltText("Instastory")).toHaveLength(2);
  });

  it("renders both 'Add' button and stories when user is profile owner", () => {
    render(<Stories isProfileOwner={true} stories={mockStories} />);
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getAllByAltText("Instastory")).toHaveLength(2);
  });
});

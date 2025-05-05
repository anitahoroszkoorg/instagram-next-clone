import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./page";

jest.mock("@/app/posts/[id]/page", () => ({
  __esModule: true,
  default: () => <div>Mock Posts Component</div>,
}));

describe("HomePage", () => {
  it("renders the Posts component", () => {
    const { getByText } = render(<HomePage />);
    expect(getByText("Mock Posts Component")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import { render, screen } from "@testing-library/react";
import { ImagesGrid } from "./ImagesGrid";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("ImagesGrid", () => {
  it("should display skeletons while loading", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<ImagesGrid id="user123" setPostsLength={() => {}} />);

    const skeletons = screen.getAllByTestId("skeleton");

    expect(skeletons.length).toBe(6);
  });
});

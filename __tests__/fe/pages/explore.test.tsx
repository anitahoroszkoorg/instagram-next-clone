import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ExplorePage from "@/app/explore/page";
import { mockSession } from "../../../src/app/utils/mockSession";

describe("ExplorePage", () => {
  it("renders the Explore component", () => {
    const queryClient = new QueryClient();
    render(
      <SessionProvider session={mockSession}>
        <QueryClientProvider client={queryClient}>
          <ExplorePage />
        </QueryClientProvider>
      </SessionProvider>,
    );

    expect(screen.getByTestId("explore-component")).toBeInTheDocument();
  });
});

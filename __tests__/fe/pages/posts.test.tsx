import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "@/app/posts/[id]/page";
import { mockSession } from "../../../src/app/utils/mockSession";

describe("PostsPage", () => {
  it("renders the Posts component", () => {
    const queryClient = new QueryClient();

    render(
      <SessionProvider session={mockSession}>
        <QueryClientProvider client={queryClient}>
          <Posts />
        </QueryClientProvider>
      </SessionProvider>,
    );

    expect(screen.getByTestId("feed")).toBeInTheDocument();
    expect(screen.getByTestId("create")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "@/components/Home/page";
import { mockSession } from "../../../src/app/utils/mockSession";

describe("HomePage", () => {
  it("renders the Explore component", () => {
    const queryClient = new QueryClient();

    render(
      <SessionProvider session={mockSession}>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </SessionProvider>,
    );

    expect(screen.getByTestId("feed")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import ActivatePage from "@/app/activate/[id]/page";
import { mockSession } from "../../../src/app/utils/mockSession";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => "test-token"),
  })),
}));

describe("ActivatePage", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("renders the activation page with providers", () => {
    render(
      <SessionProvider session={mockSession}>
        <QueryClientProvider client={queryClient}>
          <ActivatePage params={{ id: "1" }} />
        </QueryClientProvider>
      </SessionProvider>,
    );

    expect(screen.getByTestId("confirmation")).toBeInTheDocument();
  });

  it("matches snapshot with providers", () => {
    const { container } = render(
      <SessionProvider session={mockSession}>
        <QueryClientProvider client={queryClient}>
          <ActivatePage params={{ id: "1" }} />
        </QueryClientProvider>
      </SessionProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});

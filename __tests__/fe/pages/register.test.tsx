import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Register from "@/app/register/page";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  redirect: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe("RegisterPage", () => {
  const renderWithProviders = (session: any) => {
    const queryClient = new QueryClient();
    render(
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Register />
        </QueryClientProvider>
      </SessionProvider>,
    );
  };

  it("renders register page", () => {
    renderWithProviders(null);
    expect(screen.getByTestId("registerPage")).toBeInTheDocument();
  });

  it("does not render login page if user is authenticated", () => {
    const mockSession = {
      user: { name: "Test User", email: "test@example.com" },
      expires: "2099-01-01T00:00:00.000Z",
    };

    renderWithProviders(mockSession);
    expect(screen.queryByTestId("registerPage")).not.toBeInTheDocument();
  });
});

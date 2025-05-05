import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { useSession } from "next-auth/react";

const mockFetch = jest.fn();
global.fetch = mockFetch as jest.Mock;
jest.mock("next-auth/react");

const mockUseSession = useSession as jest.Mock;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useLoggedInUser", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockUseSession.mockReturnValue({ data: null });
  });

  it("should be disabled when no session", () => {
    const { result } = renderHook(() => useLoggedInUser(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.isFetching).toBe(false);
  });

  it("should fetch user data when session exists", async () => {
    const mockUser = {
      id: "123",
      name: "Test User",
      email: "test@example.com",
    };
    mockUseSession.mockReturnValue({
      data: { user: { email: "test@example.com" } },
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          message: "Success",
          userDetails: mockUser,
        }),
    });

    const { result } = renderHook(() => useLoggedInUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockUser);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `/api/user/`,
      expect.objectContaining({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
  });

  it("should handle fetch errors", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { email: "test@example.com" } },
    });
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ message: "Server Error" }),
    });

    const { result } = renderHook(() => useLoggedInUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProfileData } from "@/app/hooks/useProfileData";

const mockFetch = jest.fn();
global.fetch = mockFetch as jest.Mock;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

describe("useProfileData", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should be disabled when no userId", () => {
    const { result } = renderHook(() => useProfileData(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.isFetching).toBe(false);
  });

  it("should fetch profile data successfully", async () => {
    const userId = "user123";
    const mockUser = { id: userId, name: "Test User" };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          message: "Success",
          userDetails: mockUser,
        }),
    });

    const { result } = renderHook(() => useProfileData(userId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockUser);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `/api/user/${userId}`,
      expect.objectContaining({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
  });

  it("should handle fetch errors", async () => {
    const userId = "user123";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: "Not found" }),
    });

    const { result } = renderHook(() => useProfileData(userId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});

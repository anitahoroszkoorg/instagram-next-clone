import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFollowData } from "@/app/hooks/useFollowData";

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

describe("useFollowData", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should be disabled when no userId", () => {
    const { result } = renderHook(() => useFollowData(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.isFetching).toBe(false);
  });

  it("should fetch follow data successfully", async () => {
    const userId = "user123";
    const mockData = {
      followers: [{ id: "1", username: "follower1" }],
      followed: [{ id: "2", username: "followed1" }],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          message: "Success",
          ...mockData,
        }),
    });

    const { result } = renderHook(() => useFollowData(userId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockData);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `/api/followers/${userId}`,
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

    const { result } = renderHook(() => useFollowData(userId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});

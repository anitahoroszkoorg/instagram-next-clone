export async function fetchData<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: Record<string, any>,
): Promise<{ status: number; data: T }> {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    ...(data && { body: JSON.stringify(data) }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return {
    status: response.status,
    data: await response.json(),
  };
}

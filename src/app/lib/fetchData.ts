export async function fetchData<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: Record<string, any>,
): Promise<{ status: number; data: T | null }> {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    ...(data && { body: JSON.stringify(data) }),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    try {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Request failed");
    } catch {
      throw new Error(`Request failed with status ${response.status}`);
    }
  }
  const text = await response.text();
  const jsonData = text ? JSON.parse(text) : null;

  return { status: response.status, data: jsonData };
}

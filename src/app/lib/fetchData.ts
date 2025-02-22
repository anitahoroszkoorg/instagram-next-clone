export async function fetchData<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: Record<string, any> | FormData,
  headers: Record<string, string> = {},
): Promise<{ status: number; data: T }> {
  const isFormData = data instanceof FormData;

  const customHeaders = isFormData
    ? { ...headers }
    : { "Content-Type": "application/json", ...headers };

  const options: RequestInit = {
    method,
    headers: customHeaders,
    ...(data && { body: isFormData ? data : JSON.stringify(data) }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `Request failed with status ${response.status}`,
    );
  }

  return {
    status: response.status,
    data: await response.json(),
  };
}

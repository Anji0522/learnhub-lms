const API_BASE = import.meta.env.VITE_API_URL || "";

export async function api(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}/api${path}`, {
      ...options,
      credentials: "include",
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      body:
        options.body && typeof options.body !== "string"
          ? JSON.stringify(options.body)
          : options.body,
    });
  } catch (cause) {
    const error = new Error(
      "Cannot reach the LearnHub API. Check that the backend is running and connected to MongoDB.",
      { cause },
    );
    throw error;
  }

  const contentType = response.headers.get("content-type") || "";
  let payload;
  if (contentType.includes("application/json")) {
    try {
      payload = await response.json();
    } catch (cause) {
      throw new Error("The LearnHub API returned invalid JSON.", { cause });
    }
  } else {
    const message = response.ok
      ? "The LearnHub API returned an unexpected response."
      : `The LearnHub API returned an unreadable error (HTTP ${response.status}). Check that the backend is running and connected to MongoDB.`;
    payload = { message };
  }

  if (!response.ok) {
    const error = new Error(
      payload?.message ||
        `LearnHub API request failed (HTTP ${response.status}).`,
    );
    error.status = response.status;
    throw error;
  }
  return payload;
}

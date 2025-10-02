// API configuration
const getApiBaseUrl = () => {
  // In development, use the proxy (Next.js rewrites)
  if (process.env.NODE_ENV === "development") {
    return "/api";
  }

  // In production, use the environment variable or default
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
};

export const testBackend = async () => {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/ping`);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorBody}`
      );
    }

    const result = await response.json();
    return JSON.stringify(result);
  } catch (error) {
    console.error("Error testing backend:", error);
    return `Failed to connect to backend`;
  }
};

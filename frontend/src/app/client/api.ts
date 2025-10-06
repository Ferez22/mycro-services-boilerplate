export const testBackend = async () => {
  try {
    const response = await fetch(`/api/ping`);

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

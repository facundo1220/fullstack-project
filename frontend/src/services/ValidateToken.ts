export const authenticatedFetch = async (url: string, options: RequestInit) => {
  let access_token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 401) {
    try {
      access_token = await refreshAccessToken();

      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${access_token}`,
        },
      });

      return retryResponse;
    } catch (error) {
      {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      }
    }
  }

  if (!response.ok) {
    const errorMessage = "An unexpected error occurred";

    throw new Error(errorMessage);
  }

  return response;
};

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");

  if (!refresh_token) {
    throw new Error("No refresh token available");
  }

  const response = await fetch("http://0.0.0.0:8000/refresh_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token }),
  });

  if (!response.ok) {
    throw new Error("Error refreshing access token");
  }

  const responseJson = await response.json();

  localStorage.setItem("access_token", responseJson.access_token);

  return responseJson.access_token;
};

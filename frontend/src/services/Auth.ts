interface LoginInterface {
  email: string;
  password: string;
}

interface RegisterInterface {
  username: string;
  email: string;
  password: string;
}

export const Login = async ({ email, password }: LoginInterface) => {
  const jsonData = { email, password };

  const response = await fetch("http://0.0.0.0:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};

export const Register = async ({
  email,
  password,
  username,
}: RegisterInterface) => {
  const jsonData = { username, email, password };

  const response = await fetch("http://0.0.0.0:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};

export const RecoverUserPassword = async (email: string) => {
  const jsonData = { email };

  const response = await fetch("http://0.0.0.0:8000/password_reset/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};

export const SendNewUserPassword = async (password: string, token: string) => {
  const jsonData = { password, token };

  const response = await fetch(
    "http://0.0.0.0:8000/password_reset/confirm/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};

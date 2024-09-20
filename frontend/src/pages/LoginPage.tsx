import { useState } from "react";
import Button from "../components/Button/Button";
import { Login } from "../services/Auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginResponse = await Login({
        email: formData.email,
        password: formData.password,
      });

      if (loginResponse.access_token) {
        localStorage.setItem("access_token", loginResponse.access_token);
        localStorage.setItem("refresh_token", loginResponse.refresh_token);

        navigate("/products");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center items-center  h-full p-5 ">
      <div className="">
        <form
          onSubmit={handleFormSubmit}
          className="bg-[#f6f6f6] p-3 rounded-xl shadow-xl flex flex-col items-center gap-3"
          action=""
        >
          <h1 className="text-3xl font-semibold font-mono">Welcome back</h1>
          <h2 className="text-lg">
            Enter your details to get login in to your account
          </h2>

          <div className="flex flex-col gap-3 w-full">
            <input
              required={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              name="email"
              placeholder="user@email.com"
              onChange={handleChange}
              value={formData.email}
              type="email"
            />
            <input
              required={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              name="password"
              placeholder="******"
              onChange={handleChange}
              value={formData.password}
              type="password"
            />
          </div>

          <Button title="Login" className="bg-[#fbe155] hover:bg-yellow-400 w-full" />

          <div className="flex w-full justify-between">
            <a className="text-sm font-semibold" href="/register">
              Don't have an account?
            </a>
            <a className="text-sm font-semibold" href="/recover_password">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

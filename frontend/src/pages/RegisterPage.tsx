import { useState } from "react";
import Button from "../components/Button/Button";
import { Register } from "../services/Auth";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      await Register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("User created succesfully");
      navigate("/");
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
          <h1 className="text-3xl font-semibold font-mono">
            Create an Account
          </h1>
          <h2 className="text-lg">
            Complete the following information to create your account
          </h2>

          <div className="flex flex-col gap-3 w-full">
            <input
              required={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              name="username"
              placeholder="userName"
              onChange={handleChange}
              value={formData.username}
              type="text"
            />
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

          <div className="flex justify-between w-full">
            <Button
              className="bg-white w-1/2"
              onclick={() => {
                navigate("/login");
              }}
              title="Login"
            />
            <Button
              className="bg-[#fbe155] hover:bg-yellow-400 w-1/2"
              title="Create yout account"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

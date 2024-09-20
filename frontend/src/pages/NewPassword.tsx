import { useState } from "react";
import Button from "../components/Button/Button";
import { SendNewUserPassword } from "../services/Auth";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading/Loading";

function NewPassword() {
  const { reset_token } = useParams();

  const [resetPass, setresetPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (reset_token) {
        setLoading(true);
        await SendNewUserPassword(formData.password, reset_token);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      setresetPass(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return loading ? (
    <Loading />
  ) : resetPass ? (
    <div className="h-full flex justify-center items-center gap-2">
      <p className="text-sm">Password changed succesfully</p>
      <a className="text-sm font-semibold underline" href="/">
        Go to login page
      </a>
    </div>
  ) : (
    <div className="flex justify-center items-center  h-full p-5 ">
      <div className="">
        <form
          onSubmit={handleFormSubmit}
          className="bg-[#f6f6f6] p-3 rounded-xl shadow-xl flex flex-col items-center gap-3"
          action=""
        >
          <h1 className="text-3xl font-semibold font-mono">
            Recover your Account
          </h1>
          <h2 className="text-lg">Enter your new password please</h2>

          <div className="flex flex-col gap-3 w-full">
            <input
              required={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              name="password"
              placeholder="*****"
              onChange={handleChange}
              value={formData.password}
              type="password"
            />
          </div>

          <Button
            className="bg-[#fbe155] hover:bg-yellow-400 w-full"
            title="Save new password"
          />
        </form>
      </div>
    </div>
  );
}

export default NewPassword;

import { useState } from "react";
import Button from "../components/Button/Button";
import { RecoverUserPassword } from "../services/Auth";
import Loading from "../components/Loading/Loading";

function RecoverPassword() {
  const [sendEmail, setSendEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      await RecoverUserPassword(formData.email);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      setSendEmail(true);
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
  ) : sendEmail ? (
    <div className="h-full flex justify-center items-center gap-2">
      <p className="text-sm">
        Email send succesfully, review you inbox to reset your password
      </p>
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
          <h2 className="text-lg">
            Enter toy credentials to reset your password
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
          </div>

          <Button
            className="bg-[#fbe155] hover:bg-yellow-400 w-full"
            title="Send Recover Email"
          />
        </form>
      </div>
    </div>
  );
}

export default RecoverPassword;

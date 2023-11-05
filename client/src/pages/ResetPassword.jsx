import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate("");
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const changePassword = (e) => {
    e.preventDefault();
    if (!password || !confirm) setError("Field can not be empty");
    else if (password != confirm) {
      setError("password and confirm password should have same value");
    } else {
      axios
        .post(
          `http://localhost:3001/backend/users/reset_password/${id}/${token}`,
          { password: password }
        )
        .then(() => {
          console.log("password has been sucessfully");
          navigate("/login");
        })
        .catch((err) => {
          setError("Can not reset password");
          console.log(err);
        });
    }
  };
  return (
    <div>
      <section className="bg-gray-50 w-screen ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md dark:bg-gray-100 dark:border-gray-700 sm:p-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Change Password
            </h2>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={changePassword}
            >
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");
  const token2 = sessionStorage.getItem("token");
  const navigate = useNavigate();
  if (!token && !token2) {
    useEffect(() => {
      navigate("/login");
    });
    if (token2) {
      navigate("/");
    }
  }
  const handleLogout = () => {
    axios
      .post("http://localhost:3001/backend/users/logout")
      .then((response) => {
        console.log(response.data.message);
        localStorage.removeItem("token");
        localStorage.setItem("rememberMe",false)
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out", error);
      });
  };

  return (
    <div>
    <button
      onClick={handleLogout}
      className="group absolute flex justify-center top-5 right-5 py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Logout
    </button>
    <h2>This Is Home Page</h2>
    </div>
  );
}

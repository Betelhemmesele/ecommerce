import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const [confirmationCode, setCode] = useState("");
  const[error,setError]=useState("")
  const navigate = useNavigate("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!confirmationCode){
        setError("Please enter the code sent to your email")
    }
    else{
    axios
      .post("http://localhost:3001/backend/users/confirm", {
        confirmationCode: confirmationCode,
      })
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
        } else {
          console.log("Account Created Sucessfully");
          navigate("/");
        }
      }).catch((err)=>{
        console.log("Confirmation Error:", err);
        setError("Confirmation Failed! Input the Correct Code")
      })
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 py-8 bg-white shadow-md max-w-md">
        <h1 className="text-2xl font-bold mb-4">Confirmation</h1>
        <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <label htmlFor="confirmationCode" className="block mb-4">
            Enter the confirmation code:
            <input
              id="confirmationCode"
              type="text"
              value={confirmationCode}
              onChange={(e) => setCode(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mt-2 w-full"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmationPage;

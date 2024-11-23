import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");

  const navigate = useNavigate();
  const loginToggle = async () => {
    if (!email.endsWith("@gmail.com")) {
      setShowError("Please use a Gmail address.");
      return;
    }
    if (!email || !password) {
      setShowError("Plase type email and password.");
      return;
    }

    try {
      // Get the server domain from environment variable
      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
      // console.log("Server Domain: ", serverDomain);

      // Make the API request
      const result = await axios.post(`${serverDomain}/lego/auth/login`, {
        email,
        password,
      });
      // console.log("Code : ", result);
      if (result.data.code === "200") {
        // console.log("yes");
        login(result.data.data);
      } else {
        // console.log("No");
        await setShowError(result.data.message);
        console.log("Error message: ", result.data.message);
      }
      // console.log("Login Result: ", result.data);

      navigate("/dashboard");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setShowError("");
  };

  useEffect(() => {
    setTimeout(() => {
      setShowError("");
    }, 5000);
  }, [showError]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col m-5 justify-center items-center w-96 h-80 justify-around border-2 rounded border-black shrink">
          <h1 className="text-3xl font-semibold tracking-widest">Welcome</h1>
          <input
            type="text"
            name="email"
            placeholder="exampl@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-80 px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password!"
            className="mb-4 w-80 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 font-medium">{showError}</p>
          <div className="flex gap-10 mb-5 w-full shrink justify-center">
            <button
              type="submit"
              onClick={loginToggle}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
            <button
              onClick={handleCancel}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

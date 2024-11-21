import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const login = async () => {
    try {
      // Get the server domain from environment variable
      const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
      console.log("Server Domain: ", serverDomain);

      // Make the API request
      const result = await axios.post(`${serverDomain}/lego/auth/login`, {
        email,
        password,
      });

      console.log("Login Result: ", result);
      // navigate("/dashboard");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col m-5 justify-center items-center w-96 h-80 gap-10 border-2 rounded border-black shrink">
          <h1>Welcome</h1>
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
          <div className="flex gap-10">
            <button
              type="submit"
              onClick={login}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Login
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
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

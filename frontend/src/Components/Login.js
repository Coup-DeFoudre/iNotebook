import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement login logic
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error(`Error: ${response.status} - ${errorResponse.error}`);
      alert("Login failed. Please try again.");
      return;
    }
    
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and set isLoggedIn to true
      localStorage.setItem("token", json.token);
      window.location.href = "/";
      

      //TODO: alert 
    } else {
      alert("Invalid Credentials");
    }

    setFormData({ username: "", password: "" });
  };

  return (
    <div className="my-5 flex justify-center items-center">
      <div className=" rounded-md p-8 w-[50vw] max-w-lg text-[#A8FF35] font- text-sm backdrop-brightness-50 backdrop-blur-sm shadow-lg">
        <h2 className="text-3xl font-extrabold text-white mb-6">
        Sign In to iNotebook
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              required
              className="appearance-none border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring focus:border-blue-500"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-6 relative">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="appearance-none border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:ring focus:border-blue-500"
              value={formData.password}
              onChange={handleInputChange}
            />
            <span
              className="absolute  right-3 mt-2 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.88 14.88A10.05 10.05 0 0012 17a10.05 10.05 0 00-5.88-2.12M12 2a4 4 0 014 4M8 6a4 4 0 014-4"
                  />
                </svg>
              )}
            </span>
          </div>

          <div className="flex items-center justify-start">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 my-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500 w-full"
            >
              Log in
            </button>
          </div>
          <div>
            <p className="text-center text-gray-300 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-600">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

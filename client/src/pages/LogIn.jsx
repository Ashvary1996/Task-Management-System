import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);

        alert("Login successful!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
          <button
            type="submit"
            className="mb-2 w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
          >
            Log In
          </button>
          <span className="m-2">
            Don't have an account?
            <Link className="pl-2 font-medium text-blue-500" to="/signup">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

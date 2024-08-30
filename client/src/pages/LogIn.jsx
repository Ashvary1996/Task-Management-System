import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password)
      toast.warn("Email & Password Required!", {
        autoClose: 5000,
      });
    else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
          {
            email,
            password,
          }
        );
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);

          toast.success("Login successful!", {
            autoClose: 1000,
            onClose: () => navigate("/home"),
          });
        }
      } catch (error) {
        console.error("Error logging in:", error);
        toast.error("Login failed. Please check your credentials.", {
          autoClose: 5000,
        });
      }
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
      <ToastContainer />
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password)
      toast.warn("Name, Email & Password Required!", {
        autoClose: 5000,
      });
    else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
          {
            username,
            email,
            password,
          }
        );
        if (response.status === 201) {
          toast.success("User registered successfully!", {
            autoClose: 3000,
            onClose: () => navigate("/login"),
          });
        }
      } catch (error) {
        console.error("Error registering user:", error);
        toast.error("Registration failed. Please try again.", {
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
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
            Sign Up
          </button>
          <span className="m-2 ">
            Already a user?
            <Link className="pl-2 font-medium text-blue-500" to="/login">
              Log-In
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;

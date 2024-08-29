import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
          <button
            type="submit"
            className="mb-2 w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
          >
            Login
          </button>
          <span className="m-2 ">
            New user ? Register here!
            <Link className="font-medium pl-2  text-blue-500" to="/signup">
              Sign-Up
            </Link> 
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">Page Not Found</p>
        <Link to="/" className="mt-4 inline-block text-teal-600 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;

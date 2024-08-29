import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/login");
  };

   
  const username = localStorage.getItem("username");

  return (
    <header className="bg-teal-600 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Task Management System</h1>
        <div className="relative group">
          <span className="text-lg font-semibold cursor-pointer">
            {username || "User"}
          </span>
          <div className="absolute right-0 mt-0 hidden group-hover:block">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-teal-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

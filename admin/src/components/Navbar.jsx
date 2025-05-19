import React from "react";
import { logoBlack } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App"; 

const Navbar = ({ onLogout }) => {
  const handleLogout = async () => {
    await axios.get(`${backendUrl}/api/v1/logout`, { withCredentials: true });
    onLogout(); 
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src={logoBlack}
            alt="Logo"
            className="w-40 h-auto object-contain"
          />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition duration-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;

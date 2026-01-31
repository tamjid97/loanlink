import React from "react";
import { Link, Outlet } from "react-router";
import logo from "../assets/login.jpg";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      {/* Logo & Brand */}
      <Link to="/" className="flex items-center gap-3 group mb-10">
        <div
          className="w-12 h-12 rounded-3xl
                     bg-gradient-to-br from-yellow-400 to-yellow-500
                     flex items-center justify-center
                     shadow-xl
                     transform transition-transform duration-300 group-hover:scale-110"
        >
          <span className="text-white font-extrabold text-xl tracking-tight">
            L
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-wide select-none">
          <span className="text-yellow-500">Loan</span>
          <span className="text-gray-800 dark:text-gray-200">Link</span>
        </h1>
      </Link>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Form / Outlet */}
        <div className="flex-1 w-full lg:w-1/2">
          <Outlet />
        </div>

        {/* Image */}
        <div className="flex-1 w-full lg:w-1/2">
          <img
            src={logo}
            alt="logo"
            
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
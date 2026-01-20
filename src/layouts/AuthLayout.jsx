import React from "react";
import { Link, Outlet } from "react-router";
import logo  from "../assets/login.jpg"

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <Link to="/" className="flex items-center gap-3 group">
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
        <div className="flex">
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
          <div className="flex--1">
            <img src={logo} alt="logo" />
          </div>
        </div>
        

    </div>
  );
};

export default AuthLayout;

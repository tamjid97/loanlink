// src/pages/Home/Shared/NavBar/NavBar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("light");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogOut = () => {
    logout()
      .then(() => toast.info("Logged out successfully 👋"))
      .catch((err) => toast.error(err.message));
  };

  // ✅ JSX menu items (NO map)
  const menuItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-yellow-500 font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>

      {
        user && <>
          <li>
            <NavLink
              to="/dashboard/Add-Loan"
              className={({ isActive }) =>
                isActive ? "text-yellow-500 font-bold" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      }
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="dropdown lg:hidden">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="btn btn-ghost p-2 text-xl"
            >
              ☰
            </button>
            <ul
              className={`menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg ${
                mobileMenu ? "block" : "hidden"
              }`}
            >
              {menuItems}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 sm:block hidden rounded-full bg-yellow-400 flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <h1 className="text-3xl font-extrabold select-none">
              <span className="text-yellow-500">Loan</span>
              <span className="text-gray-800 dark:text-gray-200">Link</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium gap-4">
            {menuItems}
          </ul>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white transition-all ${
                theme === "dark" ? "translate-x-7" : "translate-x-0"
              } flex items-center justify-center`}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </span>
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-10 h-10 rounded-full border"
              />
              <button
                onClick={handleLogOut}
                className="btn btn-sm bg-red-500 text-white"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="login"
              className="btn btn-sm bg-blue-500 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

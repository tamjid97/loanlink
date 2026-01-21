// src/pages/Home/Shared/NavBar/NavBar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify"; // ✅ ONLY ADDITION

const NavBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
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

  // 🔥 ONLY THIS FUNCTION UPDATED (toast added)
  const handleLogOut = () => {
    logout()
      .then(() => {
        toast.info("Logged out successfully 👋");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Personal Loans", path: "/personal-loans" },
    { name: "Business Loans", path: "/business-loans" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

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
              className={`menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg transition-all duration-300 ${
                mobileMenu
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={`block font-semibold p-2 ${
                      isActive(item.path) ? "text-yellow-500" : "text-gray-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-12 h-12 sm:block hidden tracking-wide  rounded-full bg-yellow-400 flex items-center justify-center"
            >
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
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`pb-1 border-b-2 border-transparent hover:border-gray-300 ${
                    isActive(item.path) ? "border-yellow-400" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-all ${
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
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <button
                onClick={handleLogOut}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
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

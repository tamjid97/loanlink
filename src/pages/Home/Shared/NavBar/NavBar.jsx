import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [theme, setTheme] = useState("light");
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  // Theme load from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Menu Items
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Personal Loans", path: "/personal-loans" },
    { name: "Business Loans", path: "/business-loans" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  // Active color mapping
  const getActiveColor = (name) => {
    switch (name) {
      case "Home":
        return theme === "dark" ? "text-indigo-600" : "text-yellow-400";
      case "Personal Loans":
        return theme === "dark" ? "text-purple-600" : "text-green-400";
      case "Business Loans":
        return theme === "dark" ? "text-indigo-600" : "text-pink-400";
      case "About":
        return theme === "dark" ? "text-gray-400" : "text-orange-400";
      case "Contact":
        return theme === "dark" ? "text-purple-700" : "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  // Button color mapping based on active page
  const getButtonColor = () => {
    const activeItem = menuItems.find((item) => isActive(item.path));
    if (!activeItem) return theme === "dark" ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-300 hover:bg-gray-400";

    switch (activeItem.name) {
      case "Home":
        return theme === "dark" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-yellow-400 hover:bg-yellow-500";
      case "Personal Loans":
        return theme === "dark" ? "bg-purple-600 hover:bg-purple-700" : "bg-green-400 hover:bg-green-500";
      case "Business Loans":
        return theme === "dark" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-pink-400 hover:bg-pink-500";
      case "About":
        return theme === "dark" ? "bg-gray-700 hover:bg-gray-800" : "bg-orange-400 hover:bg-orange-500";
      case "Contact":
        return theme === "dark" ? "bg-purple-700 hover:bg-purple-800" : "bg-red-400 hover:bg-red-500";
      default:
        return theme === "dark" ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-300 hover:bg-gray-400";
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo + Mobile Dropdown */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="btn btn-ghost p-2 text-xl"
            >
              ☰
            </button>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg transition-all duration-300 ${
                mobileMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={`block font-semibold p-2 transition-colors duration-300 ${
                      isActive(item.path) ? getActiveColor(item.name) : "text-gray-800 hover:text-gray-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-12 h-12 rounded-3xl
                bg-gradient-to-br from-yellow-400 to-yellow-500
                flex items-center justify-center
                shadow-xl
                transform transition-transform duration-300 group-hover:scale-110"
            >
              <span className="text-white font-extrabold text-xl tracking-tight">L</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-wide select-none">
              <span className="text-yellow-500">Loan</span>
              <span className="text-gray-800 dark:text-gray-200">Link</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium gap-4">
            {menuItems.map((item) => (
              <li key={item.name} className="transition-colors duration-300">
                <Link
                  to={item.path}
                  className={`pb-1 border-b-2 border-transparent hover:border-gray-300 ${
                    isActive(item.path) ? getActiveColor(item.name).replace("text-", "border-") : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow
                flex items-center justify-center transition-all duration-300
                ${theme === "dark" ? "translate-x-7" : "translate-x-0"}`}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </span>
          </button>

          {/* Apply Now Button */}
          <Link to="/login" className={`btn btn-sm text-white ${getButtonColor()}`}>Login</Link>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;

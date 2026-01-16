import React from "react";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Navbar Start */}
        <div className="flex items-center">
          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <details>
                  <summary>Services</summary>
                  <ul className="p-2 bg-base-100 rounded-box">
                    <li><a>Personal Loans</a></li>
                    <li><a>Business Loans</a></li>
                  </ul>
                </details>
              </li>
              <li><a>About</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>

          {/* Logo */}
          <a className="btn btn-ghost text-xl font-bold ml-2 lg:ml-0">
            LoanLink
          </a>
        </div>

        {/* Navbar Center - Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li><a>Home</a></li>
            <li>
              <details>
                <summary>Services</summary>
                <ul className="p-2 bg-base-100 rounded-box shadow-lg">
                  <li><a>Personal Loans</a></li>
                  <li><a>Business Loans</a></li>
                </ul>
              </details>
            </li>
            <li><a>About</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="flex items-center gap-3">
          <a className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-white">
            Apply Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

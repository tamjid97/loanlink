import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-base-content mt-10">
      
      {/* Top Section: Useful Links */}
      <div className="max-w-7xl -mt-11 mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Services */}
        <div>
          <h6 className="font-bold text-lg mb-4">Services</h6>
          <ul className="space-y-2">
            <li><Link className="link link-hover">Branding</Link></li>
            <li><Link className="link link-hover">Design</Link></li>
            <li><Link className="link link-hover">Marketing</Link></li>
            <li><Link className="link link-hover">Advertisement</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="font-bold text-lg mb-4">Company</h6>
          <ul className="space-y-2">
            <li><Link className="link link-hover">About Us</Link></li>
            <li><Link className="link link-hover">Contact</Link></li>
            <li><Link className="link link-hover">Jobs</Link></li>
            <li><Link className="link link-hover">Press Kit</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="font-bold text-lg mb-4">Legal</h6>
          <ul className="space-y-2">
            <li><Link className="link link-hover">Terms of Use</Link></li>
            <li><Link className="link link-hover">Privacy Policy</Link></li>
            <li><Link className="link link-hover">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Logo + Description */}
        <div className="flex flex-col items-start gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo Icon */}
            <div
              className="w-12 h-12 rounded-3xl
              bg-gradient-to-br from-yellow-400 to-yellow-500
              flex items-center justify-center
              shadow-xl
              transform transition-transform duration-300 group-hover:scale-110"
            >
              <span className="text-white font-extrabold text-xl tracking-tight">L</span>
            </div>

            {/* Logo Text */}
            <h1 className="text-2xl font-extrabold tracking-wide select-none">
              <span className="text-yellow-500">Loan</span>
              <span className="text-gray-800  dark:text-gray-200">Link</span>
            </h1>
          </Link>
          <p className="text-sm text-gray-500">
            Providing reliable tech since 2026
          </p>
        </div>
      </div>

      {/* Bottom Section: Copyright + Social */}
      <div className="border-t border-base-300 px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} LoanLink. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a aria-label="Twitter" className="hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>

          <a aria-label="YouTube" className="hover:text-red-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>

          <a aria-label="Facebook" className="hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

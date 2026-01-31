import React from "react";
import { Link, Outlet } from "react-router-dom";

// ✅ React Icons imports
import { BiAddToQueue } from "react-icons/bi";
import { LuWalletCards } from "react-icons/lu";
import { MdOutlineAppShortcut, MdOutlinePendingActions } from "react-icons/md";
import { SiNginxproxymanager } from "react-icons/si";
import { FcApproval } from "react-icons/fc";
import { GiAnatomy } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          <div className="px-4">
            <h1 className="text-2xl font-extrabold tracking-wide select-none">
              <span className="text-yellow-500">Loan</span>
              <span className="text-gray-800 dark:text-gray-200">Link</span>
            </h1>
          </div>
        </nav>

        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            {/* Homepage – সব ইউজার */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* Admin only */}
            {role === "admin" && (
              <>
                <li>
                  <Link to="/dashboard/All-Loans">
                    <LuWalletCards />
                    <span className="is-drawer-close:hidden">All Loans</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/Application-Loans">
                    <MdOutlineAppShortcut />
                    <span className="is-drawer-close:hidden">
                      Loan Applications
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* Manager only */}
            {role === "manager" && (
              <>
                <li>
                  <Link to="/dashboard/Add-Loan">
                    <BiAddToQueue />
                    <span className="is-drawer-close:hidden">Add Loan</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/Manage-Loans">
                    <SiNginxproxymanager />
                    <span className="is-drawer-close:hidden">
                      Manage Loans
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/pending-loans">
                    <MdOutlinePendingActions />
                    <span className="is-drawer-close:hidden">
                      Pending Loans
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/approved-loans">
                    <FcApproval />
                    <span className="is-drawer-close:hidden">
                      Approved Loans
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* My Loans – শুধুমাত্র user */}
            {role === "user" && (
              <li>
                <Link to="/dashboard/My-Loans">
                  <GiAnatomy />
                  <span className="is-drawer-close:hidden">My Loans</span>
                </Link>
              </li>
            )}

            {/* My Profile – user + manager */}
            {(role === "user" || role === "manager") && (
              <li>
                <Link to="/dashboard/My-Profile">
                  <CgProfile />
                  <span className="is-drawer-close:hidden">My Profile</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

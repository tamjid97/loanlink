import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home/Home";
import AllLone from "../pages/Home/lone/AllLone";
import DetailsLone from "../pages/Home/lone/DetailsLone";
import ApplyLons from "../pages/Home/lone/ApplyLons";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddLoan from "../pages/Dashboard/LonePages/AddLoan";
import AllLones from "../pages/Dashboard/LonePages/AllLones";
import ApplicationLon from "../pages/Dashboard/ApplicationLon";
import ManageLoans from "../pages/Dashboard/LonePages/ManageLoans";
import pendingLoans from "../pages/Dashboard/LonePages/pendingLoans";
import ApprovedLoans from "../pages/Dashboard/LonePages/ApprovedLoans";
import MyLoans from "../pages/Dashboard/LonePages/MyLoans";
import MyProfile from "../pages/Dashboard/LonePages/MyProfile";

import RootLayout from "../pages/Auth/Login/RootLayout";

export const router = createBrowserRouter([
  // 🌐 Public routes (Home & All Loans)
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "All-Loans", // 🔹 Public route
        element: <AllLone />,
      },
      {
        path: "Lone-Details/:id",
        element: (
          <PrivateRoute>
            <DetailsLone />
          </PrivateRoute>
        ),
      },
      {
        path: "apply-loan/:id",
        element: (
          <PrivateRoute>
            <ApplyLons />
          </PrivateRoute>
        ),
      },
    ],
  },

  // 📝 Auth routes (Login/Register)
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // 📊 Dashboard routes (Private)
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "Add-Loan",
        element: <AddLoan />,
      },
      {
        path: "All-Loans",
        element: <AllLones />,
      },
      {
        path: "Application-Loans",
        element: <ApplicationLon />,
      },
      {
        path: "Manage-Loans",
        element: <ManageLoans />,
      },
      {
        path: "pending-loans",
        element: <pendingLoans />,
      },
      {
        path: "approved-loans",
        element: <ApprovedLoans />,
      },
      {
        path: "My-Loans",
        element: <MyLoans />,
      },
      {
        path: "My-Profile",
        element: <MyProfile />,
      },
    ],
  },
]);
  
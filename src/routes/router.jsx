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
import PendingLoans from "../pages/Dashboard/LonePages/PendingLoans";
import ApprovedLoans from "../pages/Dashboard/LonePages/ApprovedLoans";
import MyLoans from "../pages/Dashboard/LonePages/MyLoans";
import MyProfile from "../pages/Dashboard/LonePages/MyProfile";

import RootLayout from "../pages/Auth/Login/RootLayout";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import NotFound from "../pages/Dashboard/NotFound";


export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "All-Loans", element: <AllLone /> },
      {
        path: "Lone-Details/:id",
        element: <PrivateRoute><DetailsLone /></PrivateRoute>,
      },
      {
        path: "apply-loan/:id",
        element: <PrivateRoute><ApplyLons /></PrivateRoute>,
      },
    ],
  },

  // Auth
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // Dashboard
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // Admin-only
      { path: "All-Loans", element: <AdminRoute><AllLones /></AdminRoute> },
      { path: "Application-Loans", element: <AdminRoute><ApplicationLon /></AdminRoute> },

      // Manager + Admin
      { path: "Add-Loan", element: <AddLoan />},
      { path: "Manage-Loans", element: <ManageLoans /> },
      { path: "pending-loans", element: <PendingLoans />},
      { path: "approved-loans", element: <ApprovedLoans /> },

      // All users
      { path: "My-Loans", element: <MyLoans /> },
      { path: "My-Profile", element: <MyProfile /> },
    ],
  },

  // Catch-all 404
  { path: "*", element: <NotFound /> },
]);
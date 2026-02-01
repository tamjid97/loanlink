import { createBrowserRouter } from "react-router-dom";

// ---------- Public Pages ----------
import Home from "../pages/Home/Home/Home";
import AllLone from "../pages/Home/lone/AllLone";
import DetailsLone from "../pages/Home/lone/DetailsLone";
import ApplyLons from "../pages/Home/lone/ApplyLons";

// ---------- Auth ----------
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

// ---------- Layouts ----------
import RootLayout from "../pages/Auth/Login/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// ---------- Routes Protection ----------
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";

// ---------- Dashboard Pages ----------
import AddLoan from "../pages/Dashboard/LonePages/AddLoan";
import AllLones from "../pages/Dashboard/LonePages/AllLones";
import ApplicationLon from "../pages/Dashboard/ApplicationLon";
import ManageLoans from "../pages/Dashboard/LonePages/ManageLoans";
import PendingLoans from "../pages/Dashboard/LonePages/PendingLoans";
import ApprovedLoans from "../pages/Dashboard/LonePages/ApprovedLoans";
import MyLoans from "../pages/Dashboard/LonePages/MyLoans";
import UserProfile from "../pages/Dashboard/UserProfile";
import ManageUsers from "../pages/Dashboard/LonePages/ManageRole";
import Payment from "../pages/Dashboard/LonePages/Payment";

// ---------- Not Found ----------
import NotFound from "../pages/Dashboard/NotFound";

export const router = createBrowserRouter([
  // =====================
  // PUBLIC ROUTES
  // =====================
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "All-Loans", element: <AllLone /> },
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

  // =====================
  // AUTH ROUTES
  // =====================
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // =====================
  // DASHBOARD ROUTES
  // =====================
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // ----- Admin Only -----
      {
        path: "All-Loans",
        element: (
          <AdminRoute>
            <AllLones />
          </AdminRoute>
        ),
      },
      {
        path: "Application-Loans",
        element: (
          <AdminRoute>
            <ApplicationLon />
          </AdminRoute>
        ),
      },
      {
        path: "manage-roles",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },

      // ----- Manager + Admin -----
      {
        path: "Add-Loan",
        element: (
          <ManagerRoute>
            <AddLoan />
          </ManagerRoute>
        ),
      },
      { path: "Manage-Loans", element: <ManageLoans /> },
      { path: "pending-loans", element: <PendingLoans /> },
      { path: "approved-loans", element: <ApprovedLoans /> },

      // ----- All Logged-in Users -----
      { path: "My-Loans", element: <MyLoans /> },
      { path: "user-Profile", element: <UserProfile /> },

      // ✅ PAYMENT (FIXED)
      { path: "payment/:id", element: <Payment /> },
    ],
  },

  // =====================
  // 404
  // =====================
  { path: "*", element: <NotFound /> },
]);

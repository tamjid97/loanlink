import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddLoan from "../pages/Dashboard/LonePages/AddLoan";
import AllLone from "../pages/Home/lone/AllLone";
import DetailsLone from "../pages/Home/lone/DetailsLone";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "All-Loans",
        element: (
            <AllLone></AllLone>
        ),
      },
      {
  path: "Lone-Details/:id",  
  element: (
    <PrivateRoute>
      <DetailsLone />
    </PrivateRoute>
  ),
}

    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout></DashboardLayout>{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "Add-Loan",
        Component: AddLoan,
      },
    ],
  },
]);

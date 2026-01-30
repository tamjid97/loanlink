import { createBrowserRouter } from "react-router-dom";


import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddLoan from "../pages/Dashboard/LonePages/AddLoan";
import AllLone from "../pages/Home/lone/AllLone";
import DetailsLone from "../pages/Home/lone/DetailsLone";
import ApplyLons from "../pages/Home/lone/ApplyLons";
import RootLayout from "../pages/Auth/Login/RootLayout";
import AllLones from "../pages/Dashboard/LonePages/AllLones";
import ApplicationLon from "../pages/Dashboard/ApplicationLon";
import ManageLoans from "../pages/Dashboard/LonePages/ManageLoans";
import pendingLoans from "../pages/Dashboard/LonePages/pendingLoans";
import ApprovedLoans from "../pages/Dashboard/LonePages/ApprovedLoans";
import MyLoans from "../pages/Dashboard/LonePages/MyLoans";
import MyProfile from "../pages/Dashboard/LonePages/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
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
},
{
  path: "apply-loan/:id",
  element: (
    <PrivateRoute>
      <ApplyLons />
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
      {
        path: "All-Loans",
        Component: AllLones,
      },
      {
        path: "Application-Loans",
        Component: ApplicationLon,
      },
      {
        path: "Manage-Loans",
        Component: ManageLoans,
      },
      {
        path: "pending-loans",
        Component: pendingLoans,
      },
      {
        path: "approved-loans",
        Component: ApprovedLoans,
      },
      {
        path: "My-Loans",
        Component: MyLoans,
      },
      {
        path: "My-Profile",
        Component: MyProfile,
      },
    ],
  },
]);

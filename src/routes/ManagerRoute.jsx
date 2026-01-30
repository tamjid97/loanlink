import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/UseAuth";

const ManagerRoute = () => {
  const { user } = useAuth();
  const { role, isLoading } = useRole();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (role !== "manager" && role !== "admin") return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};
export default ManagerRoute;
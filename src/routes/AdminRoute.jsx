// routes/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import UseAuth from "../hooks/UseAuth";

const AdminRoute = ({ children }) => {
  const { user } = UseAuth();
  const { role, isLoading } = useRole();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return role === "admin" ? children : <Navigate to="/dashboard" />;
};

export default AdminRoute;

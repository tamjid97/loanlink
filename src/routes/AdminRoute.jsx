import React from "react";
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const auth = useAuth() || {};
  const user = auth.user;
  const { role, isLoading } = useRole();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return role === "admin" ? children : <Navigate to="/dashboard" />;
};

export default AdminRoute;

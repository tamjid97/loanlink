import React from "react";
import useAuth from "../hooks/UseAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
          <span className="loading loading-spinner loading-lg text-sky-400"></span>
          <p className="mt-4 text-gray-300 text-sm tracking-wide">
            Loading your experience...
          </p>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;

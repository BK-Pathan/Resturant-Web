
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();

  // If user is not logged in, redirect to login
  // and remember the page they were trying to access
  if (!authStatus) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

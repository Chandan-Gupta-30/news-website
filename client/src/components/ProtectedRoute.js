import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // ❌ No token → go to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ✅ Token exists → allow access
  return children;
}

export default ProtectedRoute;
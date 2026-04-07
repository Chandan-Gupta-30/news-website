import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminSettings from "./pages/AdminSettings";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Toast
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>

      <Toaster position="top-right" />

      <Routes>

        {/* ✅ IMPORTANT: Put this BEFORE "*" */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/settings" element={<AdminSettings />} />

        {/* Forgot */}
        <Route path="/forgot" element={<ForgotPassword />} />

        {/* ❗ Keep this LAST ALWAYS */}
        <Route path="*" element={<Home />} />

      </Routes>

    </Router>
  );
}

export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NewsDetail from "./pages/NewsDetail";
import AdminSettings from "./pages/AdminSettings";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<NewsDetail />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/settings" element={<AdminSettings />} />

      </Routes>
    </Router>
  );
}

export default App;
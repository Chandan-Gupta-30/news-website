import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("All fields required ❌");
    }

    try {
      const res = await axios.post(
        "https://news-backend-efyu.onrender.com/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful ✅");

      navigate("/admin");
    } catch {
      toast.error("Invalid email or password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-80">

        <h2 className="text-2xl font-bold mb-6 text-center">
          🔐 Admin Login
        </h2>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔥 FORGOT PASSWORD BUTTON */}
        <div className="text-right mb-4">
          <span
            onClick={() => navigate("/forgot")}
            className="text-blue-500 text-sm cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🔐 Admin Login
        </h2>

        <input
          className="border border-gray-300 p-2 w-full mb-4 rounded focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border border-gray-300 p-2 w-full mb-6 rounded focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>

    </div>
  );
}

export default Login;
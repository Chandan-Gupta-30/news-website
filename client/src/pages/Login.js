import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://news-backend-efyu.onrender.com/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch {
      alert("Invalid email or password ❌");
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
          className="border p-2 w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
        <p
  className="text-blue-500 cursor-pointer text-sm mt-2"
  onClick={() => (window.location.href = "/forgot")}
>
  Forgot Password?
</p>

      </div>
    </div>
  );
}

export default Login;
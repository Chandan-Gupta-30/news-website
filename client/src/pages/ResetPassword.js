import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      await axios.post(
        `https://news-backend-efyu.onrender.com/reset-password/${token}`,
        { password }
      );

      toast.success("Password reset ✅");
    } catch {
      toast.error("Invalid or expired link ❌");
    }
  };

  return (
    <div className="p-10 text-center">
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        className="border p-2 m-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button
        onClick={handleReset}
        className="bg-green-500 text-white px-4 py-2"
      >
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;
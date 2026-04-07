import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    if (!password) {
      return toast.error("Enter new password ❌");
    }

    try {
      await axios.post(
        `https://news-backend-efyu.onrender.com/reset-password/${token}`,
        { password }
      );

      toast.success("Password reset successful ✅");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data || "Invalid or expired link ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">

        <h2 className="text-xl mb-4 text-center">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          Reset Password
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;
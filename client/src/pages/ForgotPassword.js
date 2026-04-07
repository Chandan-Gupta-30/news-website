import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async () => {
    if (!email) return toast.error("Email required ❌");

    try {
      const res = await axios.post(
        "https://news-backend-efyu.onrender.com/forgot-password",
        { email }
      );

      toast.success(res.data.message);
      setResetLink(res.data.resetLink);
    } catch (err) {
      toast.error(err.response?.data || "Error ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">

        <h2 className="text-xl mb-4 text-center">Forgot Password</h2>

        <input
          placeholder="Enter admin email"
          className="border p-2 w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Generate Reset Link
        </button>

        {resetLink && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm break-all">
            <p className="mb-2 font-semibold">Reset Link:</p>

            <a
              href={resetLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Open Reset Page
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;
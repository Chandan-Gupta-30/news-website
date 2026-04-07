import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
  try {
    const res = await axios.post(
      "https://news-backend-efyu.onrender.com/forgot-password",
      { email }
    );

    toast.success("Link generated ✅");

    // 👇 SHOW LINK
    alert("Reset Link:\n" + res.data.resetLink);

  } catch {
    toast.error("Email not found ❌");
  }
};

  return (
    <div className="p-10 text-center">
      <h2 className="text-xl mb-4">Forgot Password</h2>

      <input
        placeholder="Enter email"
        className="border p-2 mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Send Reset Link
      </button>
    </div>
  );
}

export default ForgotPassword;
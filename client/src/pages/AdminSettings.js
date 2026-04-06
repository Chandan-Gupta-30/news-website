import React, { useState } from "react";
import { createAdmin, updateAdmin } from "../services/api";

function AdminSettings() {
  const token = localStorage.getItem("token");

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updateUsername, setUpdateUsername] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");

  const handleCreate = async () => {
    try {
      await createAdmin(
        { username: newUsername, password: newPassword },
        token
      );
      alert("Admin created ✅");
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateAdmin(
        { username: updateUsername, password: updatePassword },
        token
      );
      alert("Updated ✅");
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">⚙️ Admin Settings</h2>

      <div className="border p-4 mb-6 rounded">
        <h3 className="font-bold mb-2">Create Admin</h3>

        <input
          placeholder="Username"
          className="border p-2 w-full mb-2"
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      <div className="border p-4 rounded">
        <h3 className="font-bold mb-2">Update My Account</h3>

        <input
          placeholder="New Username"
          className="border p-2 w-full mb-2"
          onChange={(e) => setUpdateUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setUpdatePassword(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;
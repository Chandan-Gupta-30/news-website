import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createAdmin,
  updateAdmin,
  getCurrentAdmin,
  getAllAdmins,
  deleteAdmin,
} from "../services/api";

function AdminSettings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [currentEmail, setCurrentEmail] = useState("");
  const [admins, setAdmins] = useState([]);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const me = await getCurrentAdmin(token);
      setCurrentEmail(me.data.email);
      setUpdateEmail(me.data.email);

      const res = await getAllAdmins(token);
      setAdmins(res.data);
    } catch {
      toast.error("Failed to load data ❌");
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async () => {
    if (!newEmail || !newPassword)
      return toast.error("All fields required ❌");

    if (!newEmail.includes("@"))
      return toast.error("Invalid email ❌");

    if (newPassword.length < 5)
      return toast.error("Password too short ❌");

    try {
      await createAdmin({ email: newEmail, password: newPassword }, token);
      toast.success("Admin created ✅");

      setNewEmail("");
      setNewPassword("");
      fetchData();
    } catch {
      toast.error("Error creating admin ❌");
    }
  };

  const handleUpdate = async () => {
    if (!updateEmail)
      return toast.error("Email required ❌");

    try {
      await updateAdmin(
        { email: updateEmail, password: updatePassword },
        token
      );
      toast.success("Updated ✅");
      fetchData();
    } catch {
      toast.error("Update failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this admin?")) return;

    try {
      await deleteAdmin(id, token);
      toast.success("Deleted ✅");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data || "Error ❌");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded"
      >
        ⬅ Back to Home
      </button>

      <h2 className="text-2xl font-bold mb-4">⚙️ Admin Settings</h2>

      <div className="bg-gray-100 p-3 mb-4 rounded">
        Logged in as: <strong>{currentEmail}</strong>
      </div>

      {/* ALL ADMINS */}
      <div className="border p-4 mb-6 rounded">
        <h3 className="font-bold mb-2">All Admins</h3>

        {admins.map((admin) => (
          <div
            key={admin._id}
            className="flex justify-between py-2 border-b"
          >
            {admin.email}

            <button
              onClick={() => handleDelete(admin._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* CREATE ADMIN */}
      <div className="border p-4 mb-6 rounded">
        <h3 className="font-bold mb-2">Create Admin</h3>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* UPDATE ADMIN */}
      <div className="border p-4 rounded">
        <h3 className="font-bold mb-2">Update My Account</h3>

        <input
          className="border p-2 w-full mb-2"
          value={updateEmail}
          onChange={(e) => setUpdateEmail(e.target.value)}
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
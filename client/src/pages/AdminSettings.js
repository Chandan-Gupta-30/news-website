import React, { useEffect, useState, useCallback } from "react";
import {
  createAdmin,
  updateAdmin,
  getCurrentAdmin,
  getAllAdmins,
  deleteAdmin,
} from "../services/api";

function AdminSettings() {
  const token = localStorage.getItem("token");

  const [currentEmail, setCurrentEmail] = useState("");
  const [admins, setAdmins] = useState([]);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");

  // ✅ FIXED with useCallback
  const fetchData = useCallback(async () => {
    try {
      const me = await getCurrentAdmin(token);
      setCurrentEmail(me.data.email);
      setUpdateEmail(me.data.email);

      const res = await getAllAdmins(token);
      setAdmins(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async () => {
    await createAdmin({ email: newEmail, password: newPassword }, token);
    alert("Admin created ✅");
    setNewEmail("");
    setNewPassword("");
    fetchData();
  };

  const handleUpdate = async () => {
    await updateAdmin(
      { email: updateEmail, password: updatePassword },
      token
    );
    alert("Updated ✅");
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this admin?")) return;

    try {
      await deleteAdmin(id, token);
      alert("Deleted ✅");
      fetchData();
    } catch (err) {
      alert(err.response?.data);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">⚙️ Admin Settings</h2>

      <div className="border p-4 mb-6 rounded bg-gray-100">
        <p><strong>Logged in as:</strong> {currentEmail}</p>
      </div>

      {/* ALL ADMINS */}
      <div className="border p-4 mb-6 rounded">
        <h3 className="font-bold mb-2">All Admins</h3>

        {admins.map((admin) => (
          <div
            key={admin._id}
            className="flex justify-between border-b py-2"
          >
            <span>{admin.email}</span>

            <button
              onClick={() => handleDelete(admin._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* CREATE */}
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
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>

      {/* UPDATE */}
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>

    </div>
  );
}

export default AdminSettings;
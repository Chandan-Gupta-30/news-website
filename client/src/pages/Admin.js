import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");

  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* ================= FETCH NEWS ================= */
  const fetchNews = async () => {
    try {
      const res = await axios.get(
        "https://news-backend-efyu.onrender.com/get-news"
      );

      // sort latest first
      const sorted = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setNewsList(sorted);
    } catch {
      toast.error("Failed to fetch news ❌");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleUpload = async () => {
    if (!image) return toast.error("Select image ❌");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "https://news-backend-efyu.onrender.com/upload",
        formData
      );
      setImageUrl(res.data.imageUrl);
      toast.success("Uploaded ✅");
    } catch {
      toast.error("Upload failed ❌");
    }
  };

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async () => {
    if (!title || !content || !imageUrl || !date) {
      return toast.error("All fields required ❌");
    }

    try {
      if (editingId) {
        await axios.put(
          `https://news-backend-efyu.onrender.com/update-news/${editingId}`,
          { title, content, imageUrl, date }
        );
        toast.success("Updated ✅");
      } else {
        await axios.post(
          "https://news-backend-efyu.onrender.com/add-news",
          { title, content, imageUrl, date }
        );
        toast.success("Added ✅");
      }

      resetForm();
      fetchNews();
    } catch {
      toast.error("Error ❌");
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setImageUrl("");
    setDate("");
    setEditingId(null);
    setShowModal(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    await axios.delete(
      `https://news-backend-efyu.onrender.com/delete-news/${id}`
    );
    toast.success("Deleted ✅");
    fetchNews();
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.imageUrl);
    setDate(item.date);
    setEditingId(item._id);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* TOP BAR */}
      <div className="flex justify-between mb-4">
        <button onClick={() => navigate("/")}>⬅ Home</button>

        <div className="flex gap-2">
          <button onClick={() => navigate("/settings")}>⚙ Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <h2 className="text-xl mb-4">📰 Admin Panel</h2>

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-4 py-2 mb-4"
      >
        + Add News
      </button>

      {/* NEWS LIST */}
      {newsList.map((item) => (
        <div key={item._id} className="border p-4 mb-3 bg-white">

          <h3 className="font-bold">{item.title}</h3>
          <p>{item.content}</p>
          <p className="text-sm text-gray-500">📅 {item.date}</p>

          <img src={item.imageUrl} alt="" className="mt-2 w-full" />

          <div className="flex gap-2 mt-2">
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>

        </div>
      ))}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-6 w-96">

            <h3 className="mb-2">
              {editingId ? "Edit News" : "Add News"}
            </h3>

            <input
              placeholder="Title"
              className="border w-full mb-2 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Content"
              className="border w-full mb-2 p-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {/* DATE FIELD */}
            <input
              type="date"
              className="border w-full mb-2 p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input type="file" onChange={(e) => setImage(e.target.files[0])} />

            <button onClick={handleUpload}>Upload</button>

            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white w-full mt-2 p-2"
            >
              Submit
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="mt-2 w-full"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Admin;
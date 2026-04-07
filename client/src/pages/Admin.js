import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  /* ================= FETCH NEWS ================= */
  const fetchNews = async () => {
    try {
      const res = await axios.get(
        "https://news-backend-efyu.onrender.com/get-news"
      );
      setNewsList(res.data);
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
    toast.success("Logged out ✅");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleUpload = async () => {
    if (!image) return toast.error("Select image first ❌");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "https://news-backend-efyu.onrender.com/upload",
        formData
      );

      setImageUrl(res.data.imageUrl);
      toast.success("Image uploaded ✅");
    } catch {
      toast.error("Upload failed ❌");
    }
  };

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async () => {
    if (!title || !content || !imageUrl) {
      return toast.error("All fields required ❌");
    }

    try {
      if (editingId) {
        await axios.put(
          `https://news-backend-efyu.onrender.com/update-news/${editingId}`,
          { title, content, imageUrl }
        );
        toast.success("News updated ✅");
      } else {
        await axios.post(
          "https://news-backend-efyu.onrender.com/add-news",
          { title, content, imageUrl }
        );
        toast.success("News added ✅");
      }

      // Reset form
      setTitle("");
      setContent("");
      setImage(null);
      setImageUrl("");
      setEditingId(null);

      fetchNews();
    } catch {
      toast.error("Error saving news ❌");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news?")) return;

    try {
      await axios.delete(
        `https://news-backend-efyu.onrender.com/delete-news/${id}`
      );
      toast.success("Deleted ✅");
      fetchNews();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.imageUrl);
    setEditingId(item._id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">

        {/* 🔝 TOP BAR */}
        <div className="flex justify-between mb-4">

          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            ⬅ Home
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/settings")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              ⚙ Settings
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

        </div>

        <h2 className="text-2xl font-bold mb-4">📰 Admin Panel</h2>

        {/* FORM */}
        <input
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="border p-2 w-full mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          className="mb-2"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          disabled={!image}
          className={`px-4 py-2 rounded mb-2 ${
            image ? "bg-purple-500 text-white" : "bg-gray-400 text-white"
          }`}
        >
          Upload Image
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          {editingId ? "Update News" : "Add News"}
        </button>

        {/* NEWS LIST */}
        <div className="mt-6">
          {newsList.map((item) => (
            <div key={item._id} className="border p-4 mb-3 rounded">

              <h3 className="font-bold">{item.title}</h3>
              <p>{item.content}</p>

              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-full mt-2"
                />
              )}

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Admin;
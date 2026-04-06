import React, { useEffect, useState } from "react";
import {
  getNews,
  addNews,
  deleteNews,
  updateNews,
  uploadImage,
} from "../services/api";

function Admin() {
  const [news, setNews] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [file, setFile] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const res = await getNews();
    setNews(res.data);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await uploadImage(formData);
    setImage(res.data.imageUrl);
    setFile(null); // clear file
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateNews(editingId, {
        title,
        content,
        category,
        image,
      });
    } else {
      await addNews({ title, content, category, image });
    }

    resetForm();
    fetchNews();
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setTitle(item.title);
    setContent(item.content);
    setCategory(item.category);
    setImage(item.image);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await deleteNews(id);
    fetchNews();
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setCategory("");
    setImage("");
    setShowModal(false);
    setFile(null);
  };

  return (
    <div className="p-6">

      {/* NAVBAR */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🛠 Admin Panel</h2>

        <div>
          <a href="/settings" className="mr-4 text-blue-500">
            Settings ⚙️
          </a>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-6"
      >
        + Add News
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-lg">

            <h3 className="text-xl font-bold mb-4">
              {editingId ? "Edit News" : "Add News"}
            </h3>

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
              placeholder="Category"
              className="border p-2 w-full mb-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <input
              placeholder="Image URL (optional)"
              className="border p-2 w-full mb-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            {/* FILE UPLOAD */}
            <input
              type="file"
              className="mb-2"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              onClick={handleUpload}
              disabled={!file}
              className={`px-3 py-1 rounded mb-3 ${
                file
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Upload Image
            </button>

            {/* ACTIONS */}
            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {editingId ? "Update" : "Add"}
              </button>

              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEWS LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {news.map((item) => (
          <div key={item._id} className="border rounded p-3 shadow">

            {item.image && (
              <img
                src={item.image}
                alt=""
                className="w-full h-40 object-cover mb-2"
              />
            )}

            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm">{item.category}</p>

            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Admin;
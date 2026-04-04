import React, { useEffect, useState } from "react";
import { getNews, addNews, deleteNews, updateNews } from "../services/api";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import NewsForm from "../components/NewsForm";

function Admin() {
  const [news, setNews] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false); // ⭐ NEW

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const res = await getNews();
    setNews(res.data);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateNews(editingId, { title, content, category, image });
    } else {
      await addNews({ title, content, category, image });
    }

    resetForm();
    fetchNews();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setImage("");
    setEditingId(null);
    setShowForm(false); // close modal
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news?")) return;
    await deleteNews(id);
    fetchNews();
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setContent(item.content);
    setCategory(item.category);
    setImage(item.image);
    setEditingId(item._id);
    setShowForm(true); // ⭐ OPEN POPUP
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* ADD BUTTON */}
      <div className="p-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        >
          + Add News
        </button>

        {/* NEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard
              key={item._id}
              item={item}
              isAdmin={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-xl relative">

            {/* ❌ CLOSE BUTTON */}
            <button
              onClick={resetForm}
              className="absolute top-2 right-3 text-xl font-bold"
            >
              ✖
            </button>

            <NewsForm
              title={title} setTitle={setTitle}
              content={content} setContent={setContent}
              category={category} setCategory={setCategory}
              image={image} setImage={setImage}
              handleSubmit={handleSubmit}
              editingId={editingId}
            />

            {/* CANCEL BUTTON */}
            <button
              onClick={resetForm}
              className="mt-3 bg-gray-500 text-white px-4 py-2 rounded w-full"
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
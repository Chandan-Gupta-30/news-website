import React, { useState, useRef } from "react";
import { uploadImage } from "../services/api";

function NewsForm({
  title, setTitle,
  content, setContent,
  category, setCategory,
  image, setImage,
  handleSubmit,
  editingId
}) {

  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  // 📁 HANDLE FILE UPLOAD
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await uploadImage(formData);
    setImage(res.data.imageUrl);

    alert("Image uploaded ✅");

    // RESET FILE INPUT AFTER UPLOAD
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 🧹 RESET AFTER SUBMIT
  const handleAddOrUpdate = async () => {
    await handleSubmit();

    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>

      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Edit News" : "Add News"}
      </h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* OPTIONAL IMAGE URL */}
      <input
        className="border p-2 w-full mb-2"
        placeholder="Paste Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {/* FILE INPUT */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />

      {/* UPLOAD BUTTON */}
      <button
        onClick={handleUpload}
        disabled={!file}
        className={`px-3 py-1 rounded mb-4 ${
          file
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        Upload Image
      </button>

      {/* PREVIEW */}
      {image && (
        <img
          src={image}
          alt=""
          className="w-full h-40 object-contain mb-4"
        />
      )}

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleAddOrUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editingId ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default NewsForm;
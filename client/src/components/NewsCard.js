import React from "react";
import { useNavigate } from "react-router-dom";

function NewsCard({ item, onEdit, onDelete, isAdmin }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => !isAdmin && navigate(`/news/${item._id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
    >

      {/* IMAGE */}
      {item.image && (
        <img
          src={item.image}
          alt=""
          className="w-full h-48 object-contain bg-gray-200"
        />
      )}

      <div className="p-4">
        {/* TITLE */}
        <h3 className="text-lg font-bold mb-2">{item.title}</h3>

        {/* PREVIEW */}
        <p className="text-gray-600 text-sm">
          {item.content.slice(0, 80)}...
        </p>

        <span className="text-blue-500 text-xs">{item.category}</span>

        {/* ADMIN BUTTONS */}
        {isAdmin && (
          <div
            className="mt-4 flex gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onEdit(item)}
              className="bg-yellow-400 px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsCard;
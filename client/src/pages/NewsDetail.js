import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const fetchNews = async () => {
    const res = await axios.get("http://localhost:5000/get-news");
    const found = res.data.find((item) => item._id === id);
    setNews(found);
  };

  if (!news) return <h2 className="p-6">Loading...</h2>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md mt-6">

        {news.image && (
          <img
            src={news.image}
            alt=""
            className="w-full h-80 object-contain bg-gray-200 mb-4"
          />
        )}

        <h1 className="text-2xl font-bold mb-4">{news.title}</h1>

        <p className="text-gray-700 mb-4">{news.content}</p>

        <span className="text-blue-500 text-sm">{news.category}</span>
      </div>
    </div>
  );
}

export default NewsDetail;
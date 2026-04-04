import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNews } from "../services/api";

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await getNews();
      const selectedNews = res.data.find((item) => item._id === id);
      setNews(selectedNews);
    };

    fetchNews();
  }, [id]);

  if (!news) return <h2 className="p-6">Loading...</h2>;

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* IMAGE */}
      {news.image && (
        <img
          src={news.image}
          alt=""
          className="w-full h-80 object-contain mb-4"
        />
      )}

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>

      {/* CATEGORY */}
      <p className="text-gray-500 mb-2">{news.category}</p>

      {/* CONTENT */}
      <p className="text-lg">{news.content}</p>
    </div>
  );
}

export default NewsDetail;
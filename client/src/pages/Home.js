import React, { useEffect, useState } from "react";
import { getNews } from "../services/api";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";

function Home() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const res = await getNews();
    setNews(res.data);
  };

  // 🔍 + 📂 FILTER
  const filteredNews = news.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || item.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <NewsCard key={item._id} item={item} />
          ))
        ) : (
          <h2 className="text-center col-span-full text-gray-600">
            No news found 😢
          </h2>
        )}

      </div>
    </div>
  );
}

export default Home;
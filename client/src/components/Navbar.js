import React from "react";

function Navbar({ search, setSearch, category, setCategory }) {
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const categories = ["All", "General", "Sports", "Tech", "Politics"];

  return (
    <div className="bg-black text-white p-4 flex flex-col gap-4">

      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">📰Palamu Express </h1>

        <div className="space-x-6">
          <a href="/">Home</a>

          {isLoggedIn && <a href="/admin">Admin</a>}

          {!isLoggedIn ? (
            <a href="/login">Login</a>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* SEARCH (ONLY if exists) */}
      {setSearch && (
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded text-black w-full md:w-1/3"
        />
      )}

      {/* CATEGORY (ONLY if exists) */}
      {setCategory && (
        <div className="flex gap-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded ${
                category === cat
                  ? "bg-blue-500"
                  : "bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
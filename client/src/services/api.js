import axios from "axios";

// 🔥 YOUR LIVE BACKEND URL
const API = "https://news-backend-efyu.onrender.com";

// GET ALL NEWS
export const getNews = () => axios.get(`${API}/get-news`);

// ADD NEWS
export const addNews = (data) => axios.post(`${API}/add-news`, data);

// DELETE NEWS
export const deleteNews = (id) =>
  axios.delete(`${API}/delete-news/${id}`);

// UPDATE NEWS
export const updateNews = (id, data) =>
  axios.put(`${API}/update-news/${id}`, data);

// UPLOAD IMAGE
export const uploadImage = (formData) =>
  axios.post(`${API}/upload`, formData);

// LOGIN
export const login = (data) =>
  axios.post(`${API}/login`, data);
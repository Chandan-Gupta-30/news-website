import axios from "axios";

const API = "https://news-backend-efyu.onrender.com";

export const getNews = () => axios.get(`${API}/get-news`);
export const addNews = (data) => axios.post(`${API}/add-news`, data);
export const deleteNews = (id) =>
  axios.delete(`${API}/delete-news/${id}`);
export const updateNews = (id, data) =>
  axios.put(`${API}/update-news/${id}`, data);

export const uploadImage = (formData) =>
  axios.post(`${API}/upload`, formData);

export const login = (data) =>
  axios.post(`${API}/login`, data);

// ADMIN
export const createAdmin = (data, token) =>
  axios.post(`${API}/create-admin`, data, {
    headers: { Authorization: token },
  });

export const updateAdmin = (data, token) =>
  axios.put(`${API}/update-admin`, data, {
    headers: { Authorization: token },
  });
import axios from "axios";

const API = "https://news-backend-efyu.onrender.com";

// ================= AUTH =================

export const loginAdmin = (data) =>
  axios.post(`${API}/login`, data);

// ================= ADMIN =================

export const createAdmin = (data, token) =>
  axios.post(`${API}/create-admin`, data, {
    headers: { Authorization: token },
  });

export const updateAdmin = (data, token) =>
  axios.put(`${API}/update-admin`, data, {
    headers: { Authorization: token },
  });

export const getCurrentAdmin = (token) =>
  axios.get(`${API}/me`, {
    headers: { Authorization: token },
  });

export const getAllAdmins = (token) =>
  axios.get(`${API}/all-admins`, {
    headers: { Authorization: token },
  });

export const deleteAdmin = (id, token) =>
  axios.delete(`${API}/delete-admin/${id}`, {
    headers: { Authorization: token },
  });

// ================= NEWS =================

export const getNews = () =>
  axios.get(`${API}/get-news`);

export const addNews = (data) =>
  axios.post(`${API}/add-news`, data);

export const deleteNews = (id) =>
  axios.delete(`${API}/delete-news/${id}`);

export const updateNews = (id, data) =>
  axios.put(`${API}/update-news/${id}`, data);

// ================= IMAGE =================

export const uploadImage = (formData) =>
  axios.post(`${API}/upload`, formData);
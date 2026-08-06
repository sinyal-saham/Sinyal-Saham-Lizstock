import axios from 'axios';

// Gunakan Environment Variable atau fallback ke domain Railway (wajib pakai https://)
const BASE_URL = process.env.REACT_APP_API_URL || "https://sinyal-saham-lizstock-production.up.railway.app/api";

// Buat instance axios
const API = axios.create({
  baseURL: BASE_URL,
});

// Interceptor untuk menyisipkan Token JWT pada setiap request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
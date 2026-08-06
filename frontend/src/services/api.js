import axios from 'axios';

// Gunakan Environment Variable atau fallback ke domain Railway (wajib pakai https://)
// Langsung arahkan ke Railway
const BASE_URL = "https://sinyal-saham-lizstock-production.up.railway.app/api";

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

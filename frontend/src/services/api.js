import axios from 'axios';

// CONTOH YANG SALAH (Penyebab ERR_CONNECTION_REFUSED):
// const API_URL = "http://localhost:5000/api";

// CONTOH YANG BENAR:
const API_URL = process.env.REACT_APP_API_URL || "https://lizstock-backend-production.up.railway.app/api";

export default API_URL;

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

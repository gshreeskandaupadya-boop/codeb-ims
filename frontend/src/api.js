import axios from 'axios';

// Base URL points to /api/auth on the backend.
// On Vercel, set VITE_API_URL = https://codeb-ims-ms4h.onrender.com/api/auth
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://codeb-ims-ms4h.onrender.com/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

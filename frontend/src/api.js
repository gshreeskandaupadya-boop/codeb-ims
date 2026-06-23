import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://codeb-ims-ms4h.onrender.com/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

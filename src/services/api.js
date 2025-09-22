import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://user-backend-xnn5.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

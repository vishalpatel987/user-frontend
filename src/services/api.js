// // import axios from 'axios';

// // const API_URL = import.meta.env.VITE_API_URL || 'https://user-backend-xnn5.onrender.com/api';

// // const api = axios.create({
// //   baseURL: API_URL,
// // });

// // api.interceptors.request.use(config => {
// //   const token = localStorage.getItem('token');
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });

// // export default api;


// import axios from 'axios';

// // 🔹 Load API URL from .env (fallback: localhost)
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
// });

// // 🔹 Add token automatically if present
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;


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

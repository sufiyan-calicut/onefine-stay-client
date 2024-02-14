import axios from 'axios';

const api = axios.create({
  baseURL: 'https://one-fine-stays.onrender.com/api',
  // baseURL: 'https://kilt-rhinoceros.cyclic.app/api',
  // baseURL: 'http://localhost:4000/api/',
});

// api.interceptors.request.use(
//   (config) => {

//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;

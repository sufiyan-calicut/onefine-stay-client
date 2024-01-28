import axios from 'axios';


export const userApi = axios.create({
  // baseURL: 'http://localhost:4000/api/user',
  // baseURL: 'https://roomie-server.onrender.com/api/user',
  baseURL: 'https://kilt-rhinoceros.cyclic.app/api/user',
});
userApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

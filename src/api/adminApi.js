import axios from 'axios';

export const adminApi = axios.create({
  baseURL: 'https://one-fine-stays.onrender.com/api/admin',
  // baseURL: 'http://localhost:4000/api/admin',
});
adminApi.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

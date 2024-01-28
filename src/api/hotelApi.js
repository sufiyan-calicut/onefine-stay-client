import axios from 'axios';

export const hotelApi = axios.create({
  // baseURL: 'https://roomie-server.onrender.com/api/hotel',
  baseURL: 'https://kilt-rhinoceros.cyclic.app/api/hotel',
  // baseURL: 'http://localhost:4000/api/hotel',
});

hotelApi.interceptors.request.use(
  (config) => {
    const hotelToken = localStorage.getItem('hotelToken');
    if (hotelToken) {
      config.headers.Authorization = `Bearer ${hotelToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



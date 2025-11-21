import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Backend URL
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default API;

import axios from 'axios';

const API = axios.create({
  // Uses your Environment Variable if it exists, otherwise defaults to localhost
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      // Check if token exists before attaching
      if (parsedUser && parsedUser.token) {
        req.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }
  }
  return req;
});

export default API;

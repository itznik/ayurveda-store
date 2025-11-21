import axios from 'axios';

// 1. Set the Base URL (Where your backend lives)
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Important for cookies/sessions
});

// 2. Automatic Security Interceptor
// Before any request is sent, check if we have a token and attach it.
API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    // Try to find user info in local storage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default API;

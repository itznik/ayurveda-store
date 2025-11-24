import axios from 'axios';

// PRODUCTION LOGIC:
// 1. If NEXT_PUBLIC_BACKEND_URL is set (e.g. in Vercel), use it.
// 2. Otherwise, default to localhost for local dev.
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Log only in dev to verify connection
if (process.env.NODE_ENV === 'development') {
  console.log("🔌 API Connecting to:", BASE_URL);
}

const API = axios.create({
  baseURL: `${BASE_URL}/api`, 
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const { token } = JSON.parse(userInfo);
        req.headers.Authorization = `Bearer ${token}`;
      } catch (e) {
        console.error("Token Error:", e);
      }
    }
  }
  return req;
});

export default API;

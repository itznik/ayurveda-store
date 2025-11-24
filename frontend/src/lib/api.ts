import axios from 'axios';

// ⚠️ REPLACE THIS WITH YOUR PUBLIC BACKEND URL BEFORE DEPLOYING
const CODESPACE_BACKEND_URL = "https://YOUR-NEW-URL-HERE-5000.app.github.dev"; 

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || CODESPACE_BACKEND_URL || 'http://localhost:5000';

// Only log in development
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
        // Silent fail in production
        if (process.env.NODE_ENV === 'development') console.error("Token Error:", e);
      }
    }
  }
  return req;
});

export default API;

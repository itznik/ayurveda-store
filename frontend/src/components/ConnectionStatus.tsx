"use client";

import { useSocket } from "@/context/SocketContext";
import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function ConnectionStatus() {
  const { isConnected } = useSocket();
  const [dbStatus, setDbStatus] = useState("Checking...");

  // Only show this component in Development mode
  // (Remove this check if you want to see it in production for testing)
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    const checkDB = async () => {
      try {
        // We try to fetch products to ensure DB read access works
        // Using 'limit=1' to keep it lightweight
        await API.get("/products?limit=1"); 
        setDbStatus("Connected ✅");
      } catch (error) {
        console.error("DB Check Failed:", error);
        setDbStatus("Disconnected ❌");
      }
    };

    // Check immediately, then check every 30 seconds
    checkDB();
    const interval = setInterval(checkDB, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isDev) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-3 rounded-lg backdrop-blur-md border border-gray-700 shadow-xl z-50 font-mono transition-opacity hover:opacity-100 opacity-80">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
        <span>Socket: {isConnected ? "Live" : "Offline"}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${dbStatus.includes("Connected") ? "bg-blue-500" : "bg-red-500"}`} />
        <span>DB: {dbStatus}</span>
      </div>
    </div>
  );
}

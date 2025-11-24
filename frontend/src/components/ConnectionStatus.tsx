"use client";

import { useSocket } from "@/context/SocketContext";
import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function ConnectionStatus() {
  const { isConnected } = useSocket();
  const [dbStatus, setDbStatus] = useState("Checking...");
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    // 1. STRICT CHECK: Only show in Development Mode
    if (process.env.NODE_ENV === "development") {
      setIsDev(true);
      
      const checkDB = async () => {
        try {
          await API.get("/products?limit=1"); 
          setDbStatus("Connected ✅");
        } catch (error) {
          setDbStatus("Disconnected ❌");
        }
      };

      checkDB();
      const interval = setInterval(checkDB, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  // 2. If not dev, render nothing (Invisible to customers)
  if (!isDev) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white text-[10px] p-3 rounded-lg backdrop-blur-md border border-gray-800 shadow-2xl z-[9999] font-mono pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]" : "bg-red-500"}`} />
        <span>Socket: {isConnected ? "Live" : "Offline"}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${dbStatus.includes("Connected") ? "bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]" : "bg-red-500"}`} />
        <span>DB: {dbStatus}</span>
      </div>
    </div>
  );
}

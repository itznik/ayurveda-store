"use client";

import { useSocket } from "@/context/SocketContext";
import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function ConnectionStatus() {
  const { isConnected } = useSocket();
  const [dbStatus, setDbStatus] = useState("Checking...");

  useEffect(() => {
    // Test the API Bridge
    const checkDB = async () => {
      try {
        await API.get("/"); // Hits the "API is running" route
        setDbStatus("Connected ✅");
      } catch (error) {
        setDbStatus("Disconnected ❌");
      }
    };
    checkDB();
  }, []);

  if (!isConnected && dbStatus !== "Connected ✅") return null; // Hide if all bad

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-3 rounded-lg backdrop-blur-md border border-gray-700 shadow-xl z-50 font-mono">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
        <span>Socket: {isConnected ? "Live" : "Offline"}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${dbStatus.includes("Connected") ? "bg-blue-500" : "bg-red-500"}`} />
        <span>API/DB: {dbStatus}</span>
      </div>
    </div>
  );
}

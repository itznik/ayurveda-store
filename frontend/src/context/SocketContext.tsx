"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define the shape of our Context
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 1. Determine the Socket URL dynamically
    // If NEXT_PUBLIC_API_URL is "http://localhost:5000/api", we need "http://localhost:5000"
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const socketUrl = apiBase.replace('/api', ''); 

    // 2. Connect
    const socketInstance = io(socketUrl, {
      transports: ["websocket"], // Force WebSocket for speed
      reconnectionAttempts: 5,   // Try to reconnect if server fails
    });

    // 3. Listen for connection success
    socketInstance.on("connect", () => {
      console.log("🟢 Connected to Real-Time Server:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("🔴 Disconnected from Real-Time Server");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // Cleanup on close
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

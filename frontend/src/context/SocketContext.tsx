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
    // 1. Connect to the Backend URL
    const socketInstance = io("http://localhost:5000", {
      transports: ["websocket"], // Force WebSocket for speed
      reconnectionAttempts: 5,   // Try to reconnect if server fails
    });

    // 2. Listen for connection success
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

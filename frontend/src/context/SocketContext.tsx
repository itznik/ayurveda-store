"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

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
    const socketUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    const socketInstance = io(socketUrl, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socketInstance.on("connect", () => {
      if (process.env.NODE_ENV === 'development') {
        console.log("🟢 Socket Connected");
      }
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      if (process.env.NODE_ENV === 'development') {
        console.log("🔴 Socket Disconnected");
      }
      setIsConnected(false);
    });

    setSocket(socketInstance);

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

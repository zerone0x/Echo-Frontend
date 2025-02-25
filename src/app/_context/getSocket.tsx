import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../_utils/getLogin";
import io, { Socket } from "socket.io-client";
const socketContext = createContext<socketContextType>({
  socket: null,
  setSocket: () => {},
  onlineUsers: [],
  setOnlineUsers: () => {},
});

interface socketContextType {
  socket: Socket | null;
  setSocket: (data: Socket | null) => void;
  onlineUsers: string[];
  setOnlineUsers: (data: string[]) => void;
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authData } = useAuth();
  useEffect(() => {
    if (authData) {
      const socketUrl = process.env.NEXT_PUBLIC_ENV === "PRD"
        ? "https://echobe.fly.dev"
        : "http://localhost:8000";
        
      const socket = io(socketUrl, {
        query: {
          userId: authData._id,
        },
        transports: ['websocket', 'polling'], // Try both WebSocket and polling
        reconnectionAttempts: 5, // Attempt to reconnect 5 times
        reconnectionDelay: 1000, // Start with a 1-second delay
        timeout: 20000, // Increase connection timeout
        forceNew: true, // Force a new connection
        withCredentials: true, // Include credentials
      });
      
      setSocket(socket);
      
      socket.on("connect", () => {
        console.log("Socket connected successfully");
      });
      
      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });
      
      socket.on("getOnlineUsers", (userIds: string[]) => {
        setOnlineUsers(userIds);
      });
      
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authData]);
  return (
    <socketContext.Provider
      value={{ socket, setSocket, onlineUsers, setOnlineUsers }}
    >
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => useContext(socketContext);

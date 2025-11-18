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
      const isProd = process.env.NEXT_PUBLIC_ENV === "PRD";
      const socketUrl = isProd
        ? process.env.NEXT_PUBLIC_ROOT_URL || "https://echobe.fly.dev"
        : "http://localhost:8000";
        
      console.log("Connecting to socket at:", socketUrl);
      console.log("Current origin:", window.location.origin);
      console.log("Environment:", process.env.NEXT_PUBLIC_ENV);
        
      // Configure Socket.IO options
      const socketOptions = {
        query: {
          userId: authData._id,
        },
        // Use both transports in both environments, but try WebSocket first
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
        forceNew: true,
        path: '/socket.io/',
      };
      
      console.log("Socket options:", JSON.stringify(socketOptions));
      
      // Create socket connection
      const socket = io(socketUrl, socketOptions);
      
      setSocket(socket);
      
      // Connection events
      socket.on("connect", () => {
        console.log("Socket connected successfully");
        console.log("Socket ID:", socket.id);
        console.log("Transport used:", socket.io.engine.transport.name);
      });
      
      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        console.error("Error details:", error.message);
        
        // If WebSocket fails, try reconnecting (the library will try polling automatically)
        if (socket.io.engine.transport.name === 'websocket') {
          console.log("WebSocket connection failed, Socket.IO will try polling automatically");
          // No need to manually change transport - Socket.IO handles this automatically
        }
      });
      
      socket.on("getOnlineUsers", (userIds: string[]) => {
        console.log("Received online users:", userIds.length);
        setOnlineUsers(userIds);
      });
      
      return () => {
        console.log("Closing socket connection");
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

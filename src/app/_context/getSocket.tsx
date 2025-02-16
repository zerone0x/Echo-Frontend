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
      const socket = io(
        process.env.NEXT_PUBLIC_ENV === "PRD"
          ? "https://echobe.fly.dev"
          : "http://localhost:8000",
        {
          query: {
            userId: authData._id,
          },
        },
      );
      setSocket(socket);
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

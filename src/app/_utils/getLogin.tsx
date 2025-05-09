"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProps } from "../_config/type";
import { getUserByName } from "../_services/fetchDataAPI";

interface AuthContextType {
  authData: UserProps | null;
  setAuthData: React.Dispatch<React.SetStateAction<UserProps | null>>;
  currentUserId: string | undefined;
  currentUserName: string | undefined;
}

const AuthContext = createContext<AuthContextType>({
  authData: null,
  setAuthData: () => {},
  currentUserId: undefined,
  currentUserName: undefined,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<UserProps | null>(null);
  const currentUserId = authData?._id;
  const currentUserName = authData?.name;
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/getUserJwt");
        const userName = await response.json();
        const user = await getUserByName(userName);
        const userObj = JSON.stringify(userName);
        localStorage.setItem("user", userObj);
        setAuthData(user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setAuthData(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, currentUserId, currentUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

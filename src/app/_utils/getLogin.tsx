import React, { createContext, useContext, useEffect, useState } from "react";
import getCurrentUser from "./getCurrentUser";

const AuthContext = createContext<AuthContextType>({
  authData: {},
  setAuthData: () => {},
  currentUserId: "",
  currentUserName: "",
});

interface AuthContextType {
  authData: any;
  setAuthData: (data: any) => void;
  currentUserId: string;
  currentUserName: string;
}

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});
  const currentUserId = authData._id;
  const currentUserName = authData.name;
  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      setAuthData(userData);
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

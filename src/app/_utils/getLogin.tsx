import React, { createContext, useContext, useEffect, useState } from "react";
import getCurrentUser from "./getCurrentUser";

const AuthContext = createContext<AuthContextType>({
  authData: {},
  setAuthData: () => {},
  currentUserId: "",
});

interface AuthContextType {
  authData: any;
  setAuthData: (data: any) => void;
  currentUserId: string;
}

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});
  const currentUserId = authData._id;
  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      setAuthData(userData);
    }

    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ authData, setAuthData, currentUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

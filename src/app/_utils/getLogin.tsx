import React, { createContext, useContext, useEffect, useState } from "react";
import getCurrentUser from "./getCurrentUser";

const AuthContext = createContext<AuthContextType>({
  authData: {},
  setAuthData: () => {},
});

interface AuthContextType {
  authData: any;
  setAuthData: (data: any) => void;
}

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});
  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      setAuthData(userData);
    }

    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

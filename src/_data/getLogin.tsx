import React, { createContext, useContext, useState } from "react";

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

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

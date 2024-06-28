import React, { createContext, useContext, useEffect, useState } from "react";

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
    const verifiedToken = document
      .querySelector('meta[name="x-verified-token"]')
      ?.getAttribute("content");
    console.log(verifiedToken);

    if (verifiedToken) {
      setAuthData(JSON.parse(verifiedToken));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

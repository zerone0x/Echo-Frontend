import React, { createContext, useContext, useEffect, useState } from "react";
import getCurrentUser from "./getCurrentUser";
import { UserProps } from "../_config/type";

const AuthContext = createContext<AuthContextType>({
  authData: {},
  setAuthData: () => {},
  currentUserId: "",
  currentUserName: "",
});

interface AuthContextType {
  authData: UserProps | {};
  setAuthData: (data: UserProps | {}) => void;
  currentUserId: string | undefined;
  currentUserName: string | undefined;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<UserProps | {}>({});
  const currentUserId = authData?._id;
  const currentUserName = authData?.name;
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

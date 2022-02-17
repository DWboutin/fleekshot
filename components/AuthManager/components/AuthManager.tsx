import type { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { UserFormatted } from "../../../server/api/user/dto/UserDTO";
import HttpRequestService from "../../../services/HttpRequestService";
import { useAuthManager } from "../hooks/useAuthManager";

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserFormatted | null;
  handleAuth: (session: UserFormatted) => void;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = (): Partial<AuthContextProps> => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within the _app file");
  }

  return context;
};

const AuthManager: NextPage = ({ children }) => {
  const {
    selectors: { isAuthenticated, user },
    actions: { handleAuth },
  } = useAuthManager();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthManager;

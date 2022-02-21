import { useRouter } from "next/router";
import { useState } from "react";
import { UserFormatted } from "../../../server/api/user/dto/UserDTO";
import { RequestResponse } from "../../../server/handler/ResponseHandler";
import HttpRequestService from "../../../services/HttpRequestService";

export interface AuthManagerSelectors {
  isAuthenticated: boolean;
  user: UserFormatted | null;
}

export interface AuthManagerActions {
  handleAuth: (session: UserFormatted) => void;
  fetchSession: () => void;
  handleLogout: () => void;
}

export interface AuthManagerHook {
  selectors: AuthManagerSelectors;
  actions: AuthManagerActions;
}

export function useAuthManager(): AuthManagerHook {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserFormatted | null>(null);
  const router = useRouter();

  const fetchSession = async () => {
    const session = await HttpRequestService.get("/user/");

    if (session?.success) {
      handleAuth(session.data);
    }
  };

  const handleAuth = (session: UserFormatted) => {
    setIsAuthenticated(true);
    setUser(session);
  };

  const handleLogout = () => {
    setIsAuthenticated(true);
    setUser(null);
    router.push("/account/sign-in");
  };

  return {
    selectors: { isAuthenticated, user },
    actions: { handleAuth, fetchSession, handleLogout },
  };
}

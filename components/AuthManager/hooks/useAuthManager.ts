import { useState } from "react";
import { UserFormatted } from "../../../server/api/user/dto/UserDTO";
import HttpRequestService from "../../../services/HttpRequestService";

export interface AuthManagerSelectors {
  isAuthenticated: boolean;
  user: UserFormatted | null;
}

export interface AuthManagerActions {
  handleAuth: (session: UserFormatted) => void;
  fetchSession: () => void;
}

export interface AuthManagerHook {
  selectors: AuthManagerSelectors;
  actions: AuthManagerActions;
}

export function useAuthManager(): AuthManagerHook {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserFormatted | null>(null);

  const fetchSession = async () => {
    const session = await HttpRequestService.get("/user/");

    handleAuth(session);
  };

  const handleAuth = (session: UserFormatted) => {
    if (!!session?.id) {
      setIsAuthenticated(true);
      setUser(session);
    }
  };

  return {
    selectors: { isAuthenticated, user },
    actions: { handleAuth, fetchSession },
  };
}

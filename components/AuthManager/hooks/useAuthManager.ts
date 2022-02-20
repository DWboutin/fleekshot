import { useState } from "react";
import { UserFormatted } from "../../../server/api/user/dto/UserDTO";
import { RequestResponse } from "../../../server/handler/ResponseHandler";
import HttpRequestService from "../../../services/HttpRequestService";

export interface AuthManagerSelectors {
  isAuthenticated: boolean;
  user: UserFormatted | null;
}

export interface AuthManagerActions {
  handleAuth: (session: RequestResponse<UserFormatted>) => void;
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

  const handleAuth = (session: RequestResponse<UserFormatted>) => {
    if (session?.success) {
      setIsAuthenticated(true);
      setUser(session.data);
    }
  };

  return {
    selectors: { isAuthenticated, user },
    actions: { handleAuth, fetchSession },
  };
}

import { useState } from "react";
import { UserFormatted } from "../../../server/api/user/dto/UserDTO";

export interface AuthManagerSelectors {
  isAuthenticated: boolean;
  user: UserFormatted | null;
}

export interface AuthManagerActions {
  handleAuth: (session: UserFormatted) => void;
}

export interface AuthManagerHook {
  selectors: AuthManagerSelectors;
  actions: AuthManagerActions;
}

export function useAuthManager(): AuthManagerHook {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserFormatted | null>(null);

  const handleAuth = (session: UserFormatted) => {
    if (!!session?.id) {
      setIsAuthenticated(true);
      setUser(session);
    }
  };

  return {
    selectors: { isAuthenticated, user },
    actions: { handleAuth },
  };
}

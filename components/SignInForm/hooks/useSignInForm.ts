import { useRouter } from "next/router";

import {
  UserFormatted,
  UserSignInData,
} from "../../../server/api/user/dto/UserDTO";
import HttpRequestService from "../../../services/HttpRequestService";
import {
  AuthContextProps,
  useAuthContext,
} from "../../AuthManager/components/AuthManager";

export interface SignInFormActions {
  handleFormSubmit: (values: UserSignInData) => void;
}

export interface SignInFormHook {
  actions: SignInFormActions;
}

export const getUserSignIn = async (user: UserSignInData) => {
  const result = await HttpRequestService.post("/user/sign-in", {
    user,
  });

  return result;
};

export function useSignInForm(): SignInFormHook {
  const router = useRouter();
  const authContext = useAuthContext() as AuthContextProps;
  const handleFormSubmit = async (values: UserSignInData) => {
    const user: UserFormatted = await getUserSignIn(values);

    if (!!user.id) {
      authContext.handleAuth(user);
      router.push("/");
    }
  };

  return {
    actions: {
      handleFormSubmit,
    },
  };
}

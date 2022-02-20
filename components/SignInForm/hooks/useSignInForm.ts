import { useRouter } from "next/router";
import { useState } from "react";

import {
  UserFormatted,
  UserSignInData,
} from "../../../server/api/user/dto/UserDTO";
import { ErrorCodes } from "../../../server/handler/errorHandler";
import {
  RequestResponse,
  RequestResponseMessages,
} from "../../../server/handler/ResponseHandler";
import HttpRequestService from "../../../services/HttpRequestService";
import {
  AuthContextProps,
  useAuthContext,
} from "../../AuthManager/components/AuthManager";
import { SignInFormIntlId } from "../intl/type";

export interface SignInFormSelectors {
  isRequested: boolean;
  isSuccesful: boolean;
  isLoading: boolean;
  errorCode: ErrorCodes | null;
  requestMessages: RequestResponseMessages[] | null;
}

export interface SignInFormActions {
  handleFormSubmit: (values: UserSignInData) => void;
}

export interface SignInFormHook {
  selectors: SignInFormSelectors;
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
  const [isRequested, setIsRequested] = useState(false);
  const [isSuccesful, setIsSuccesful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<ErrorCodes | null>(null);
  const [requestMessages, setRequestMessages] = useState<
    RequestResponseMessages[] | null
  >(null);

  const handleFormSubmit = async (values: UserSignInData) => {
    setIsRequested(false);
    setIsLoading(true);

    const response: RequestResponse<UserFormatted> = await getUserSignIn(
      values
    );

    setIsLoading(false);
    setIsSuccesful(response.success);

    if (response.success) {
      setRequestMessages([
        {
          message: SignInFormIntlId.signInForm_message_success,
        },
      ]);
      setTimeout(() => {
        authContext.handleAuth(response.data);
        router.push("/");
      }, 2000);
    }
    if (!response.success) {
      setErrorCode(response.errorCode as ErrorCodes);
      setRequestMessages(response.messages as RequestResponseMessages[]);
    }

    setIsRequested(true);
  };

  return {
    selectors: {
      isRequested,
      isSuccesful,
      isLoading,
      errorCode,
      requestMessages,
    },
    actions: {
      handleFormSubmit,
    },
  };
}

import { useState } from "react";

import {
  UserFormatted,
  UserSignUpData,
} from "../../../server/api/user/dto/UserDTO";
import { User } from "../../../server/api/user/models/UserModel";
import { ErrorCodes } from "../../../server/handler/errorHandler";
import {
  RequestResponse,
  RequestResponseMessages,
} from "../../../server/handler/ResponseHandler";
import HttpRequestService from "../../../services/HttpRequestService";
import { SignUpFormIntlId } from "../intl/type";

export interface SignUpFormSelectors {
  isRequested: boolean;
  isSuccesful: boolean;
  isLoading: boolean;
  errorCode: ErrorCodes | null;
  requestMessages: RequestResponseMessages[] | null;
}

export interface SignUpFormActions {
  handleFormSubmit: (values: UserSignUpData) => void;
}

export interface SignUpFormHook {
  selectors: SignUpFormSelectors;
  actions: SignUpFormActions;
}

export const saveUser = async (user: UserSignUpData) => {
  const result = await HttpRequestService.post("/user/", { user });

  return result;
};

export function useSignUpForm(): SignUpFormHook {
  const [isRequested, setIsRequested] = useState(false);
  const [isSuccesful, setIsSuccesful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<ErrorCodes | null>(null);
  const [requestMessages, setRequestMessages] = useState<
    RequestResponseMessages[] | null
  >(null);

  const handleFormSubmit = async (values: UserSignUpData) => {
    setIsRequested(false);
    setIsLoading(true);

    const response: RequestResponse<UserFormatted> = await saveUser(values);

    setIsLoading(false);
    setIsSuccesful(response.success);
    setIsRequested(true);

    if (response.success) {
      setRequestMessages([
        {
          message: SignUpFormIntlId.signUpForm_message_success,
        },
      ]);
    }
    if (!response.success) {
      setErrorCode(response.errorCode as ErrorCodes);
      setRequestMessages(response.messages as RequestResponseMessages[]);
    }
  };

  return {
    selectors: {
      isRequested,
      isSuccesful,
      isLoading,
      errorCode,
      requestMessages,
    },
    actions: { handleFormSubmit },
  };
}

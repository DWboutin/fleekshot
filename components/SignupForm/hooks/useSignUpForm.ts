import { UserSignUpData } from "../../../server/api/user/dto/UserDTO";
import { User } from "../../../server/api/user/models/UserModel";
import HttpRequestService from "../../../services/HttpRequestService";

export interface SignUpFormSelectors {}

export interface SignUpFormActions {
  handleFormSubmit: (values: UserSignUpData) => void;
}

export interface SignUpFormHook {
  selectors: SignUpFormSelectors;
  actions: SignUpFormActions;
}

export const saveUser = async (user: User) => {
  const result = await HttpRequestService.post("/user/", { user });

  return result;
};

export function useSignUpForm(): SignUpFormHook {
  const handleFormSubmit = async (values: UserSignUpData) => {
    const user = await saveUser(values);
  };

  return {
    selectors: {},
    actions: { handleFormSubmit },
  };
}

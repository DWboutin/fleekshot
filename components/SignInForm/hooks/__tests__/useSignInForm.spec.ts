import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import * as nextRouter from "next/router";

import { useSignInForm, getUserSignIn } from "../useSignInForm";
import * as authManager from "../../../AuthManager/components/AuthManager";
import { act } from "react-dom/test-utils";
import HttpRequestService from "../../../../services/HttpRequestService";
import { UserSignInData } from "../../../../server/api/user/dto/UserDTO";

jest.mock("../../../../services/HttpRequestService");

describe("useSignInForm", () => {
  const SIGN_IN: UserSignInData = {
    username: "USER NAME",
    password: "PASSWORD",
  };
  let result: RenderHookResult<
    Parameters<typeof useSignInForm>,
    ReturnType<typeof useSignInForm>
  >;

  const renderUseSignInForm = () => {
    result = renderHook(() => useSignInForm());
  };

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    jest
      .spyOn(nextRouter, "useRouter")
      .mockImplementation(() => ({ route: "/" } as nextRouter.NextRouter));
    jest
      .spyOn(authManager, "useAuthContext")
      .mockImplementation(
        () => ({ user: { id: "FAKE_ID" } } as authManager.AuthContextProps)
      );
  });

  describe("handleFormSubmit", () => {
    beforeEach(() => {
      renderUseSignInForm();
    });

    it("should have made a request to sign in", () => {
      act(() => {
        result.result.current.actions.handleFormSubmit(SIGN_IN);
      });

      expect(HttpRequestService.post).toHaveBeenCalledWith("/user/sign-in", {
        user: SIGN_IN,
      });
    });
  });

  describe("getUserSignIn", () => {
    it("should have made a request to sign in", () => {
      act(() => {
        getUserSignIn(SIGN_IN);
      });

      expect(HttpRequestService.post).toHaveBeenCalledWith("/user/sign-in", {
        user: SIGN_IN,
      });
    });
  });
});

import {
  act,
  renderHook,
  RenderHookResult,
} from "@testing-library/react-hooks";
import { UserFormatted } from "../../../../server/api/user/dto/UserDTO";
import { RequestResponse } from "../../../../server/handler/ResponseHandler";
import HttpRequestService from "../../../../services/HttpRequestService";

import { useAuthManager } from "../useAuthManager";

jest.mock("../../../../services/HttpRequestService");

describe("useAuthManager", () => {
  const USER_SESSION: RequestResponse<UserFormatted> = {
    success: true,
    data: {
      id: "ID",
      name: "NAME",
      username: "USERNAME",
    },
  };
  let result: RenderHookResult<
    Parameters<typeof useAuthManager>,
    ReturnType<typeof useAuthManager>
  >;

  const renderUseAuthManager = () => {
    result = renderHook(() => useAuthManager());
  };

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("default values", () => {
    beforeEach(() => {
      renderUseAuthManager();
    });

    it("should isAuthenticated be false", () => {
      expect(result.result.current.selectors.isAuthenticated).toBe(false);
    });

    it("should user be null", () => {
      expect(result.result.current.selectors.user).toBe(null);
    });
  });

  describe("actions", () => {
    describe("handleAuth", () => {
      describe("with a session", () => {
        beforeEach(() => {
          renderUseAuthManager();

          act(() => {
            result.result.current.actions.handleAuth(USER_SESSION);
          });
        });

        it("should change isAuthenticated to true", () => {
          expect(result.result.current.selectors.isAuthenticated).toBe(true);
        });

        it("should put the session into user", () => {
          expect(result.result.current.selectors.user).toEqual(
            USER_SESSION.data
          );
        });
      });

      describe("without a session", () => {
        beforeEach(() => {
          renderUseAuthManager();

          act(() => {
            result.result.current.actions.handleAuth(null as any);
          });
        });

        it("should isAuthenticated stay false", () => {
          expect(result.result.current.selectors.isAuthenticated).toBe(false);
        });

        it("should user stay null", () => {
          expect(result.result.current.selectors.user).toBe(null);
        });
      });
    });

    describe("fetchSession", () => {
      beforeEach(() => {
        renderUseAuthManager();
      });

      it("should have made a request to get user session", () => {
        act(() => {
          result.result.current.actions.fetchSession();
        });

        expect(HttpRequestService.get).toHaveBeenCalledWith("/user/");
      });
    });
  });
});

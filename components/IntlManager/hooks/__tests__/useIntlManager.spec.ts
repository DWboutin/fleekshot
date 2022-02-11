import {
  act,
  renderHook,
  RenderHookResult,
} from "@testing-library/react-hooks";

import storageService from "../../../../services/storageService";
import useIntlManager, { defaultLocale } from "../useIntlManager";

jest.mock("../../../../services/storageService");

describe("useUseIntlManaget", () => {
  let result: RenderHookResult<
    Parameters<typeof useIntlManager>,
    ReturnType<typeof useIntlManager>
  >;

  const renderUseUseIntlManager = () => {
    result = renderHook(() => useIntlManager());
  };

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("default values", () => {
    beforeEach(() => {
      renderUseUseIntlManager();
    });

    it(`should locale be ${defaultLocale}`, () => {
      expect(result.result.current.selectors.locale).toBe(defaultLocale);
    });

    it("should get the localStorage locale", () => {
      expect(storageService.get).toHaveBeenCalledWith("locale");
    });
  });

  describe("on locale change", () => {
    const NEW_LOCALE = "fr";

    beforeEach(() => {
      renderUseUseIntlManager();

      act(() => {
        result.result.current.actions.handleLanguageChange(NEW_LOCALE);
      });
    });

    it("should change the locale correctly", () => {
      expect(result.result.current.selectors.locale).toBe(NEW_LOCALE);
    });

    it("should update localStorage locale", () => {
      expect(storageService.set).toHaveBeenCalledWith("locale", NEW_LOCALE);
    });
  });
});

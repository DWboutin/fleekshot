import {
  act,
  renderHook,
  RenderHookResult,
} from "@testing-library/react-hooks";
import { TextFieldTypes } from "../../components/TextField";

import { useTextField } from "../useTextField";

describe("useTextField", () => {
  let result: RenderHookResult<
    Parameters<typeof useTextField>,
    ReturnType<typeof useTextField>
  >;

  const renderUseTextField = (type: TextFieldTypes, defaultValue?: string) => {
    result = renderHook(() => useTextField(type, defaultValue));
  };

  describe('type="text"', () => {
    const TYPE = "text";

    describe("default values", () => {
      beforeAll(() => {
        renderUseTextField(TYPE);
      });

      it("should have an empty value", () => {
        expect(result.result.current.selectors.value).toBe("");
      });

      it(`should fieldType be ${TYPE}`, () => {
        expect(result.result.current.selectors.fieldType).toBe(TYPE);
      });

      it("should isFocused is false", () => {
        expect(result.result.current.selectors.isFocused).toBe(false);
      });
    });

    describe("with a default value", () => {
      const DEFAULT_VALUE = "default value";

      beforeAll(() => {
        renderUseTextField(TYPE, DEFAULT_VALUE);
      });

      it(`should value be equal to "${DEFAULT_VALUE}"`, () => {
        expect(result.result.current.selectors.value).toBe(DEFAULT_VALUE);
      });
    });

    describe("handleOnFocus / handleOnBlur", () => {
      beforeAll(() => {
        renderUseTextField(TYPE);
      });

      it("should toggle isFocused correctly", () => {
        act(() => {
          result.result.current.actions.handleOnFocus();
        });

        expect(result.result.current.selectors.isFocused).toBe(true);

        act(() => {
          result.result.current.actions.handleOnBlur();
        });

        expect(result.result.current.selectors.isFocused).toBe(false);
      });
    });

    describe("handleOnChange", () => {
      const NEW_VALUE = "new value";

      beforeAll(() => {
        renderUseTextField(TYPE);

        act(() => {
          result.result.current.actions.handleOnChange({
            target: { value: NEW_VALUE },
          } as React.ChangeEvent<HTMLInputElement>);
        });
      });

      it(`should value be "${NEW_VALUE}"`, () => {
        expect(result.result.current.selectors.value).toBe(NEW_VALUE);
      });
    });

    describe("handlePasswordToggle", () => {
      beforeAll(() => {
        renderUseTextField(TYPE);
      });

      it("should not toggle fieldType (password/text)", () => {
        expect(result.result.current.selectors.fieldType).toBe(TYPE);

        act(() => {
          result.result.current.actions.handlePasswordToggle();
        });

        expect(result.result.current.selectors.fieldType).toBe(TYPE);

        act(() => {
          result.result.current.actions.handlePasswordToggle();
        });

        expect(result.result.current.selectors.fieldType).toBe(TYPE);
      });
    });
  });

  describe('type="email"', () => {
    const TYPE = "email";

    describe("default values", () => {
      beforeAll(() => {
        renderUseTextField(TYPE);
      });

      it("should have an empty value", () => {
        expect(result.result.current.selectors.value).toBe("");
      });

      it(`should fieldType be ${TYPE}`, () => {
        expect(result.result.current.selectors.fieldType).toBe(TYPE);
      });

      it("should isFocused is false", () => {
        expect(result.result.current.selectors.isFocused).toBe(false);
      });
    });

    describe("with a default value", () => {
      const DEFAULT_VALUE = "default value";

      beforeAll(() => {
        renderUseTextField(TYPE, DEFAULT_VALUE);
      });

      it(`should value be equal to "${DEFAULT_VALUE}"`, () => {
        expect(result.result.current.selectors.value).toBe(DEFAULT_VALUE);
      });
    });

    describe("handleOnFocus / handleOnBlur", () => {
      beforeAll(() => {
        renderUseTextField(TYPE);
      });

      it("should toggle isFocused correctly", () => {
        act(() => {
          result.result.current.actions.handleOnFocus();
        });

        expect(result.result.current.selectors.isFocused).toBe(true);

        act(() => {
          result.result.current.actions.handleOnBlur();
        });

        expect(result.result.current.selectors.isFocused).toBe(false);
      });
    });

    describe("handleOnChange", () => {
      const NEW_VALUE = "new value";

      beforeAll(() => {
        renderUseTextField(TYPE);

        act(() => {
          result.result.current.actions.handleOnChange({
            target: { value: NEW_VALUE },
          } as React.ChangeEvent<HTMLInputElement>);
        });
      });

      it(`should value be "${NEW_VALUE}"`, () => {
        expect(result.result.current.selectors.value).toBe(NEW_VALUE);
      });
    });

    describe("handlePasswordToggle", () => {
      beforeAll(() => {
        renderUseTextField(TYPE);
      });

      it("should not toggle fieldType (password/text)", () => {
        expect(result.result.current.selectors.fieldType).toBe(TYPE);

        act(() => {
          result.result.current.actions.handlePasswordToggle();
        });

        expect(result.result.current.selectors.fieldType).toBe(TYPE);

        act(() => {
          result.result.current.actions.handlePasswordToggle();
        });

        expect(result.result.current.selectors.fieldType).toBe(TYPE);
      });
    });
  });

  describe('type="password"', () => {
    const TYPE = "password";

    describe("default values", () => {
      beforeAll(() => {
        renderUseTextField(TYPE);
      });

      it("should have an empty value", () => {
        expect(result.result.current.selectors.value).toBe("");
      });

      it(`should fieldType be ${TYPE}`, () => {
        expect(result.result.current.selectors.fieldType).toBe(TYPE);
      });

      it("should isFocused is false", () => {
        expect(result.result.current.selectors.isFocused).toBe(false);
      });
    });

    describe("with a default value", () => {
      const DEFAULT_VALUE = "default value";

      beforeAll(() => {
        renderUseTextField(TYPE, DEFAULT_VALUE);
      });

      it(`should value be equal to "${DEFAULT_VALUE}"`, () => {
        expect(result.result.current.selectors.value).toBe(DEFAULT_VALUE);
      });
    });

    describe("handleOnFocus / handleOnBlur", () => {
      beforeAll(() => {
        renderUseTextField(TYPE);
      });

      it("should toggle isFocused correctly", () => {
        act(() => {
          result.result.current.actions.handleOnFocus();
        });

        expect(result.result.current.selectors.isFocused).toBe(true);

        act(() => {
          result.result.current.actions.handleOnBlur();
        });

        expect(result.result.current.selectors.isFocused).toBe(false);
      });
    });

    describe("handleOnChange", () => {
      const NEW_VALUE = "new value";

      beforeAll(() => {
        renderUseTextField(TYPE);

        act(() => {
          result.result.current.actions.handleOnChange({
            target: { value: NEW_VALUE },
          } as React.ChangeEvent<HTMLInputElement>);
        });
      });

      it(`should value be "${NEW_VALUE}"`, () => {
        expect(result.result.current.selectors.value).toBe(NEW_VALUE);
      });
    });

    describe("handlePasswordToggle", () => {
      beforeAll(() => {
        renderUseTextField(TYPE);
      });

      it("should toggle fieldType (password/text) correcly", () => {
        expect(result.result.current.selectors.fieldType).toBe(TYPE);

        act(() => {
          result.result.current.actions.handlePasswordToggle();
        });

        expect(result.result.current.selectors.fieldType).toBe("text");

        act(() => {
          result.result.current.actions.handlePasswordToggle();
        });

        expect(result.result.current.selectors.fieldType).toBe(TYPE);
      });
    });
  });
});

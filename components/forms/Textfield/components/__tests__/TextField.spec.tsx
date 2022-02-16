import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import TestWrapper from "../../../../../utils/TestWrapper";
import { SignInFormIntlId } from "../../../../SignInForm/intl/type";

import TextField, { Props } from "../TextField";

describe("<TextField />", () => {
  let renderResult: RenderResult;

  const renderTextField = ({
    id,
    name,
    type,
    label,
    defaultValue,
    error,
  }: Props) => {
    renderResult = render(
      <TestWrapper>
        <TextField
          id={id}
          name={name}
          type={type}
          label={label}
          defaultValue={defaultValue}
          error={error}
        />
      </TestWrapper>
    );
  };

  describe("default rendering", () => {
    const ID = "id";
    const NAME = "name";
    const TYPE = "text";
    const LABEL = "field label";

    beforeEach(() => {
      renderTextField({
        id: ID,
        name: NAME,
        type: TYPE,
        label: LABEL,
      });
    });

    it("should match snapshot", () => {
      expect(renderResult.container).toMatchSnapshot();
    });

    it(`should contain the label "${LABEL}"`, () => {
      expect(screen.getByText(LABEL)).toBeInTheDocument();
    });

    it(`should not contain the toggle button`, () => {
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("should contain the input with good attributes", () => {
      const input = renderResult.container.querySelector("input");

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(input?.getAttribute("id")).toBe(ID);
      expect(input?.getAttribute("name")).toBe(NAME);
      expect(input?.getAttribute("type")).toBe(TYPE);
    });
  });

  describe('type="password"', () => {
    const ID = "id";
    const NAME = "name";
    const TYPE = "password";
    const LABEL = "field label";

    beforeEach(() => {
      renderTextField({
        id: ID,
        name: NAME,
        type: TYPE,
        label: LABEL,
      });
    });

    it("should match snapshot", () => {
      expect(renderResult.container).toMatchSnapshot();
    });

    it(`should contain the label "${LABEL}"`, () => {
      expect(screen.getByText(LABEL)).toBeInTheDocument();
    });

    it(`should contain the toggle button`, () => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should contain the input with good attributes", () => {
      const input = renderResult.container.querySelector("input");

      expect(input).toBeInTheDocument();
      expect(input?.getAttribute("id")).toBe(ID);
      expect(input?.getAttribute("name")).toBe(NAME);
      expect(input?.getAttribute("type")).toBe(TYPE);
    });

    it("should toggle input type crrectly when clicking on toggle button", () => {
      const input = renderResult.container.querySelector("input");

      expect(input?.getAttribute("type")).toBe(TYPE);

      fireEvent.click(screen.getByRole("button"));

      expect(input?.getAttribute("type")).toBe("text");

      fireEvent.click(screen.getByRole("button"));

      expect(input?.getAttribute("type")).toBe(TYPE);
    });
  });

  describe("with error", () => {
    const ID = "id";
    const NAME = "name";
    const TYPE = "text";
    const LABEL = "field label";
    const ERROR = SignInFormIntlId.signInForm_errors_isRequired;

    beforeEach(() => {
      renderTextField({
        id: ID,
        name: NAME,
        type: TYPE,
        label: LABEL,
        error: ERROR,
      });
    });

    it("should match snapshot", () => {
      expect(renderResult.container).toMatchSnapshot();
    });

    it(`should contain the error icon`, () => {
      const errorIconContainer =
        renderResult.container.querySelector("span:last-child");
      const errorIcon =
        renderResult.container.querySelector("span:last-child i");

      expect(errorIconContainer).toBeInTheDocument();
      expect(errorIcon).toBeInTheDocument();
      expect(errorIcon?.classList).toContain("bx-x-circle");
    });
  });
});

import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import TestWrapper from "../../../../../utils/testWrapper";

import TextField, { Props } from "../TextField";

describe("<TextField />", () => {
  let renderResult: RenderResult;

  const renderTextField = ({ id, name, type, label, defaultValue }: Props) => {
    renderResult = render(
      <TestWrapper>
        <TextField
          id={id}
          name={name}
          type={type}
          label={label}
          defaultValue={defaultValue}
        />
      </TestWrapper>
    );
  };

  describe("default rendering", () => {
    const ID = "id";
    const NAME = "name";
    const TYPE = "text";
    const LABEL = "field label";

    beforeAll(() => {
      renderTextField({ id: ID, name: NAME, type: TYPE, label: LABEL });
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

    it("should hide label when typing values", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "hello" },
      });

      expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
    });
  });

  describe('type="password"', () => {
    const ID = "id";
    const NAME = "name";
    const TYPE = "password";
    const LABEL = "field label";

    beforeAll(() => {
      renderTextField({ id: ID, name: NAME, type: TYPE, label: LABEL });
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

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(input?.getAttribute("id")).toBe(ID);
      expect(input?.getAttribute("name")).toBe(NAME);
      expect(input?.getAttribute("type")).toBe(TYPE);
    });

    it("should hide label when typing values", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "hello" },
      });

      expect(screen.queryByText(LABEL)).not.toBeInTheDocument();
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
});

import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import TestWrapper from "../../../../utils/TestWrapper";

import Button, { Props } from "../Button";

describe("<Button />", () => {
  let renderResult: RenderResult;

  const renderButton = ({ children }: Props) => {
    renderResult = render(
      <TestWrapper>
        <Button>{children}</Button>
      </TestWrapper>
    );
  };

  describe("default rendering", () => {
    const CHILDREN = "children";

    beforeEach(() => {
      renderButton({
        children: CHILDREN,
      });
    });

    it("should match snapshot", () => {
      expect(renderResult.container).toMatchSnapshot();
    });

    it(`should contain the text "${CHILDREN}"`, () => {
      expect(screen.getByText(CHILDREN)).toBeInTheDocument();
    });
  });
});

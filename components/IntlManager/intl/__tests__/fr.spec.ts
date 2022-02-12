import fr from "../fr";

describe("intl fr", () => {
  it("should match snapshot", () => {
    expect(fr).toMatchSnapshot();
  });
});

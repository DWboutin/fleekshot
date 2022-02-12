import en from "../en";

describe("intl en", () => {
  it("should match snapshot", () => {
    expect(en).toMatchSnapshot();
  });
});

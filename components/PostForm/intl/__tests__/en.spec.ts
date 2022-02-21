import en from "../en";

describe("intl PostForm en", () => {
  it("should match snapshot", () => {
    expect(en).toMatchSnapshot();
  });
});

import messages from "../messages";

describe("intl messages", () => {
  it("should match snapshot", () => {
    expect(messages).toMatchSnapshot();
  });
});

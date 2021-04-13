import { toJSON } from ".";

describe("toJSON()", () => {
  it("calls res.json() on the response", () => {
    const json = jest.fn();
    toJSON({ json });
    expect(json).toBeCalledTimes(1);
  });
});

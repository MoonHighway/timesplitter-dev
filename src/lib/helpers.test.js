import { toJSON, topicTitleIsUnique } from ".";

describe("toJSON()", () => {
  it("calls res.json() on the response", () => {
    const json = jest.fn();
    toJSON({ json });
    expect(json).toBeCalledTimes(1);
  });
});

describe("topicTitleIsUnique(title)", () => {

  const children = [
    { title: "Chapter One", 
      children: [
        { 
          title: "sub section", 
          children: [
            { title: "deep TOPIC"}
          ]
        }
      ] 
    },
    { title: "Chapter Two" }
  ]

  it("success - topic is unique", () => {
    const result = topicTitleIsUnique("Not There", {children});
    expect(result).toEqual(true);
  });

  it("fail - level one match", () => {
    const result = topicTitleIsUnique("Chapter Two", {children});
    expect(result).toEqual(false);
  });

  it("fail - deep match", () => {
    const result = topicTitleIsUnique("deep Topic", {children});
    expect(result).toEqual(false);
  });

});
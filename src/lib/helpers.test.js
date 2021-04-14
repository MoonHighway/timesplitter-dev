import { toJSON, topicTitleIsUnique } from ".";

describe("toJSON()", () => {
  it("calls res.json() on the response", () => {
    const json = jest.fn();
    toJSON({ json });
    expect(json).toBeCalledTimes(1);
  });
});

describe("topicTitleIsUnique(title)", () => {

  const agenda = [
    { title: "Chapter One", 
      agenda: [
        { 
          title: "sub section", 
          agenda: [
            { title: "deep TOPIC"}
          ]
        }
      ] 
    },
    { title: "Chapter Two" }
  ]

  it("success - topic is unique", () => {
    const result = topicTitleIsUnique("Not There", {agenda});
    expect(result).toEqual(true);
  });

  it("fail - level one match", () => {
    const result = topicTitleIsUnique("Chapter Two", {agenda});
    expect(result).toEqual(false);
  });

  it("fail - deep match", () => {
    const result = topicTitleIsUnique("deep Topic", {agenda});
    expect(result).toEqual(false);
  });

});
import { toJSON, replenishExpanded, topicTitleIsUnique } from ".";

describe("toJSON()", () => {
  it("calls res.json() on the response", () => {
    const json = jest.fn();
    toJSON({ json });
    expect(json).toBeCalledTimes(1);
  });
});

describe("topicTitleIsUnique(title)", () => {
  const children = [
    {
      title: "Chapter One",
      children: [
        {
          title: "sub section",
          children: [{ title: "deep TOPIC" }],
        },
      ],
    },
    { title: "Chapter Two" },
  ];

  it("success - topic is unique", () => {
    const result = topicTitleIsUnique("Not There", { children });
    expect(result).toEqual(true);
  });

  it("fail - level one match", () => {
    const result = topicTitleIsUnique("Chapter Two", { children });
    expect(result).toEqual(false);
  });

  it("fail - deep match", () => {
    const result = topicTitleIsUnique("deep Topic", { children });
    expect(result).toEqual(false);
  });
});

describe("replenishExpanded(obj, exp)", () => {
  let result,
    mergeObj = {
      title: "Test Data",
      difficulty: 4,
      children: [
        {
          title: "Item One",
          length: 5,
          children: [
            { title: "Sub One", difficulty: 2 },
            {
              title: "Sub Two",
              children: [{ title: "deep item" }],
            },
          ],
        },
        {
          title: "Item Two",
          required: true,
          children: [
            { title: "Pub One" },
            { title: "Pub Two", required: false },
          ],
        },
      ],
    },
    withExpanded = {
      title: "Test Data",
      expanded: true,
      children: [
        {
          title: "Item One",
          expanded: false,
          children: [
            { title: "Sub One" },
            {
              title: "Sub Two",
              expanded: false,
              children: [{ title: "deep item" }],
            },
          ],
        },
        {
          title: "Item Two",
          expanded: true,
          children: [{ title: "Pub One" }, { title: "Pub Two" }],
        },
      ],
    };

  beforeAll(() => {
    result = replenishExpanded(mergeObj, withExpanded);
  });

  it("replenishes expanded", () => {
    expect(result).toEqual({
      title: "Test Data",
      expanded: true,
      difficulty: 4,
      children: [
        {
          title: "Item One",
          expanded: false,
          length: 5,
          children: [
            { title: "Sub One", difficulty: 2 },
            {
              title: "Sub Two",
              expanded: false,
              children: [{ title: "deep item" }],
            },
          ],
        },
        {
          title: "Item Two",
          expanded: true,
          required: true,
          children: [
            { title: "Pub One" },
            { title: "Pub Two", required: false },
          ],
        },
      ],
    });
  });
});

const { removeExpanded, removeTopic } = require(".");

describe("removeTopic()", () => {
  let result,
    testData = {
      title: "Test Data",
      expanded: true,
      agenda: [
        {
          title: "Item One",
          expanded: false,
          agenda: [
            { title: "Sub One" },
            {
              title: "Sub Two",
              expanded: false,
              agenda: [{ title: "deep item" }],
            },
          ],
        },
        {
          title: "Item Two",
          expanded: true,
          agenda: [{ title: "Pub One" }, { title: "Pub Two" }],
        },
      ],
    };

  it("removes single topic", () => {
    result = removeTopic(testData, "Sub One");
    expect(result).toEqual({
      title: "Test Data",
      expanded: true,
      agenda: [
        {
          title: "Item One",
          expanded: false,
          agenda: [
            {
              title: "Sub Two",
              expanded: false,
              agenda: [{ title: "deep item" }],
            },
          ],
        },
        {
          title: "Item Two",
          expanded: true,
          agenda: [{ title: "Pub One" }, { title: "Pub Two" }],
        },
      ],
    });
  });

  it.skip("removes topic tree", () => {});
});

describe("removeExpanded()", () => {
  let result,
    testData = {
      title: "Test Data",
      expanded: true,
      agenda: [
        {
          title: "Item One",
          expanded: false,
          agenda: [
            { title: "Sub One" },
            {
              title: "Sub Two",
              expanded: false,
              agenda: [{ title: "deep item" }],
            },
          ],
        },
        {
          title: "Item Two",
          expanded: true,
          agenda: [{ title: "Pub One" }, { title: "Pub Two" }],
        },
      ],
    };

  beforeAll(() => {
    result = removeExpanded(testData);
  });

  it("removes expanded", () => {
    expect(result).toEqual({
      title: "Test Data",
      agenda: [
        {
          title: "Item One",
          agenda: [
            { title: "Sub One" },
            {
              title: "Sub Two",
              agenda: [{ title: "deep item" }],
            },
          ],
        },
        {
          title: "Item Two",
          agenda: [{ title: "Pub One" }, { title: "Pub Two" }],
        },
      ],
    });
  });
});

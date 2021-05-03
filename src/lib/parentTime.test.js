import { parentTime } from ".";

describe("parentTime(topic, selectedTitle)", () => {
  const _testData = {
    title: "Course",
    agenda: [
      { title: "Course Welcome " },
      {
        title: "Parent Topic",
        length: 10,
        agenda: [
          {
            title: "Child Topic",
          },
          {
            title: "Second Child",
          },
        ],
      },
    ],
  };

  it("returns parent time", () => {
    const result = parentTime(_testData, "Second Child");
    expect(result).toEqual(5);
  });

  it("returns null", () => {
    const tweakData = { ..._testData };
    delete tweakData.agenda[1].length;
    const result = parentTime(_testData, "Second Child");
    expect(result).toBeFalsy();
  });
});

import { getTopicPath } from ".";

describe("getTopicPath(content, title)", () => {
  const _testTopic = {
    title: "Course Node",
    agenda: [
      {
        title: "Chapter One",
        agenda: [
          {
            title: "Course Welcome",
          },
          {
            title: "Course Details",
          },
        ],
      },
      {
        title: "Chapter Two",
        agenda: [
          {
            title: "sample one",
            agenda: [
              { title: "deep one" },
              { title: "deep two" },
              { title: "deep three" },
            ],
          },
          {
            title: "sample two",
          },
          {
            title: "sample three",
          },
        ],
      },
    ],
  };

  it("course-node", () => {
    expect(getTopicPath(_testTopic, "Course Node")).toEqual("course-node");
  });

  it("course-node/chapter-one", () => {
    expect(getTopicPath(_testTopic, "Chapter One")).toEqual(
      "course-node/chapter-one"
    );
  });

  it("course-node/chapter-two/sample-two", () => {
    expect(getTopicPath(_testTopic, "Sample Two")).toEqual(
      "course-node/chapter-two/sample-two"
    );
  });

  it("chapter-two/sample-one/deep-two", () => {
    expect(getTopicPath(_testTopic, "deep two")).toEqual(
      "course-node/chapter-two/sample-one/deep-two"
    );
  });
});

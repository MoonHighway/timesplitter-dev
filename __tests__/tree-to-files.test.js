const path = require("path");
const fs = require("fs");
const { treeToFiles } = require("../server/lib/tree-to-files");
const startData = require("./data/start.json");
const addData = require("./data/adding-files.json");
const removeData = require("./data/removing-files.json");
const rearrangeData = require("./data/moving-files.json");
const rimraf = require("rimraf");

const clearDirectory = (dir) => {
  rimraf.sync(dir);
  fs.mkdirSync(dir);
};

const exists = (_path) => () => {
  const dir = path.join(__dirname, "root", _path);
  expect(fs.existsSync(dir)).toEqual(true);
};

const doesNotExist = (_path) => () => {
  const dir = path.join(__dirname, "root", _path);
  expect(fs.existsSync(dir)).toEqual(false);
};

describe("tree to files", () => {
  let root = path.join(__dirname, "root");

  beforeAll(() => {
    if (!fs.existsSync(root)) fs.mkdirSync(root);
  });

  afterAll(() => {
    rimraf.sync(root);
  });

  describe("Base Files and Folders", () => {
    beforeAll(() => {
      clearDirectory(root);
      treeToFiles(startData, root);
    });
    describe("/chapter-one", () => {
      it("Chapter One", exists("/chapter-one"));
      it("Welcome to Class", exists("/chapter-one/welcome-to-class.md"));
      describe("A Project", () => {
        it("A Project Directory", exists("/chapter-one/a-project"));
        it("A Project File", exists("/chapter-one/a-project.md"));
        it("Step One", exists("/chapter-one/a-project/step-one.md"));
        it("Step Three", exists("/chapter-one/a-project/step-three.md"));
        describe("/chapter-one/a-project/step-two", () => {
          it("Step Two Directory", exists("/chapter-one/a-project/step-two"));
          it("Step Two File", exists("/chapter-one/a-project/step-two.md"));
          it(
            "Minor Step One",
            exists("/chapter-one/a-project/step-two/minor-step-one.md")
          );
          it(
            "Minor Step Two",
            exists("/chapter-one/a-project/step-two/minor-step-two.md")
          );
        });
      });
    });
    describe("Chapter Two", () => {
      it("Chapter Two Directory", exists("/chapter-two"));
      it("Chapter Two File", exists("/chapter-two.md"));
      it("Short Chapter", exists("/chapter-two/short-chapter.md"));
    });
    it("Conclusion", exists("conclusion.md"));
  });

  describe("Running Twice", () => {
    beforeAll(() => {
      clearDirectory(root);
      treeToFiles(startData, root);
      treeToFiles(startData, root);
    });
    describe("/chapter-one", () => {
      it("Chapter One", exists("/chapter-one"));
      it("Welcome to Class", exists("/chapter-one/welcome-to-class.md"));
      describe("A Project", () => {
        it("A Project Directory", exists("/chapter-one/a-project"));
        it("A Project File", exists("/chapter-one/a-project.md"));
        it("Step One", exists("/chapter-one/a-project/step-one.md"));
        it("Step Three", exists("/chapter-one/a-project/step-three.md"));
        describe("/chapter-one/a-project/step-two", () => {
          it("Step Two Directory", exists("/chapter-one/a-project/step-two"));
          it("Step Two File", exists("/chapter-one/a-project/step-two.md"));
          it(
            "Minor Step One",
            exists("/chapter-one/a-project/step-two/minor-step-one.md")
          );
          it(
            "Minor Step Two",
            exists("/chapter-one/a-project/step-two/minor-step-two.md")
          );
        });
      });
    });
    describe("Chapter Two", () => {
      it("Chapter Two Directory", exists("/chapter-two"));
      it("Chapter Two File", exists("/chapter-two.md"));
      it("Short Chapter", exists("/chapter-two/short-chapter.md"));
    });
    it("Conclusion", exists("conclusion.md"));
  });

  describe("Adding Content Files", () => {
    beforeAll(() => {
      clearDirectory(root);
      treeToFiles(startData, root);
      treeToFiles(addData, root);
    });
    it("adds - Questions and Answers", exists("questions-and-answers.md"));
    describe("Short Chapter", () => {
      it("Short Chapter Directory", exists("/chapter-two/short-chapter"));
      it("short Chapter File", exists("/chapter-two/short-chapter.md"));
      it(
        "getting longer",
        exists("/chapter-two/short-chapter/getting-longer.md")
      );
      it("more content", exists("/chapter-two/short-chapter/more-content.md"));
    });
    describe("Major Changes", () => {
      it("Major Changes Directory", exists("/major-changes"));
      it("Major Changes File", exists("/major-changes.md"));
      it("Side Notes", exists("/major-changes/side-notes.md"));
    });
  });

  describe("Removing Files and Folders", () => {
    beforeAll(() => {
      clearDirectory(root);
      treeToFiles(startData, root);
      treeToFiles(removeData, root);
    });
    describe("/chapter-one", () => {
      it("Chapter One", exists("/chapter-one"));
      it(
        "Welcome to Class was removed",
        doesNotExist("/chapter-one/welcome-to-class.md")
      );
      describe("A Project", () => {
        it("A Project Directory", exists("/chapter-one/a-project"));
        it("A Project File", exists("/chapter-one/a-project.md"));
        it("Step One", exists("/chapter-one/a-project/step-one.md"));
        it("Step Three", exists("/chapter-one/a-project/step-three.md"));
        describe("/chapter-one/a-project/step-two", () => {
          it("Step Two Directory", exists("/chapter-one/a-project/step-two"));
          it("Step Two File", exists("/chapter-one/a-project/step-two.md"));
          it(
            "Minor Step One",
            doesNotExist("/chapter-one/a-project/step-two/minor-step-one.md")
          );
          it(
            "Minor Step Two",
            exists("/chapter-one/a-project/step-two/minor-step-two.md")
          );
        });
      });
    });
    describe("Chapter Two", () => {
      it("Chapter Two Directory was removed", doesNotExist("/chapter-two"));
      it("Chapter Two File was removed", doesNotExist("/chapter-two.md"));
      it(
        "Short Chapter was removed",
        doesNotExist("/chapter-two/short-chapter.md")
      );
    });
    it("Conclusion", exists("conclusion.md"));
  });

  describe("Moving Files", () => {
    beforeAll(() => {
      clearDirectory(root);
      treeToFiles(startData, root);
      fs.writeFileSync(
        path.join(root, "/chapter-one/welcome-to-class.md"),
        "work done in welcome to class"
      );
      fs.writeFileSync(
        path.join(root, "/conclusion.md"),
        "work done in conclusion"
      );
      fs.writeFileSync(
        path.join(root, "/chapter-two.md"),
        "work done in Chapter Two"
      );
      fs.writeFileSync(
        path.join(root, "/chapter-two/short-chapter.md"),
        "work done in Chapter Two's short chapter"
      );

      treeToFiles(rearrangeData, root);
    });
    describe("/chapter-one", () => {
      it("Chapter One", exists("/chapter-one"));
      it(
        "Welcome to Class was removed",
        doesNotExist("/chapter-one/welcome-to-class.md")
      );
      describe("A Project", () => {
        it("A Project Directory", exists("/chapter-one/a-project"));
        it("A Project File", exists("/chapter-one/a-project.md"));
        it("Step One", exists("/chapter-one/a-project/step-one.md"));
        describe("/chapter-one/a-project/step-three", () => {
          it(
            "Step Three Directory",
            exists("/chapter-one/a-project/step-three")
          );
          it("Step Three File", exists("/chapter-one/a-project/step-three.md"));
          it(
            "Conclusion",
            exists("/chapter-one/a-project/step-three/conclusion.md")
          );
          describe("Chapter Two", () => {
            it(
              "Chapter Two Directory",
              exists("/chapter-one/a-project/step-three/chapter-two")
            );
            it(
              "Chapter Two File",
              exists("/chapter-one/a-project/step-three/chapter-two.md")
            );
            it(
              "Short Chapter",
              exists(
                "/chapter-one/a-project/step-three/chapter-two/short-chapter.md"
              )
            );
            it(
              "Welcome to Class",
              exists(
                "/chapter-one/a-project/step-three/chapter-two/welcome-to-class.md"
              )
            );
          });
        });
        describe("/chapter-one/a-project/step-two", () => {
          it("Step Two Directory", exists("/chapter-one/a-project/step-two"));
          it("Step Two File", exists("/chapter-one/a-project/step-two.md"));
          it(
            "Minor Step One",
            exists("/chapter-one/a-project/step-two/minor-step-one.md")
          );
          it(
            "Minor Step Two",
            exists("/chapter-one/a-project/step-two/minor-step-two.md")
          );
        });
      });
    });
    it("Chapter Two Directory moved", doesNotExist("/chapter-two"));
    it("Chapter Two File moved", doesNotExist("/chapter-two.md"));
    it("Conclusion was removed", doesNotExist("conclusion.md"));

    describe("Moved File Contents", () => {
      it("Welcome to class remained in tact", () => {
        const contents = fs.readFileSync(
          path.join(
            root,
            "/chapter-one/a-project/step-three/chapter-two/welcome-to-class.md"
          ),
          "UTF-8"
        );
        expect(contents).toEqual("work done in welcome to class");
      });
      it("Conclusion remained in tact", () => {
        const contents = fs.readFileSync(
          path.join(root, "/chapter-one/a-project/step-three/conclusion.md"),
          "UTF-8"
        );
        expect(contents).toEqual("work done in conclusion");
      });
      it("Chapter Two Overview remained in tact", () => {
        const contents = fs.readFileSync(
          path.join(root, "/chapter-one/a-project/step-three/chapter-two.md"),
          "UTF-8"
        );
        expect(contents).toEqual("work done in Chapter Two");
      });
      it("Short Chapter remained in tact", () => {
        const contents = fs.readFileSync(
          path.join(
            root,
            "/chapter-one/a-project/step-three/chapter-two/short-chapter.md"
          ),
          "UTF-8"
        );
        expect(contents).toEqual("work done in Chapter Two's short chapter");
      });
    });
  });
});

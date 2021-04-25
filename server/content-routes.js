const express = require("express");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const {
  topicTitleIsUnique,
  addTopicToTreeRoot,
  addTopicToParent,
  saveAndSendContent,
  loadContent,
  treeToFiles,
  removeExpanded,
  toTree,
} = require("./lib");
const deepEqual = require("deep-equal");

const readFile = promisify(fs.readFile);
const router = express.Router();

module.exports = function (rootFolder) {
  let content = loadContent(rootFolder);

  router.put("/", async (req, res) => {
    const incomingContent = removeExpanded(req.body);

    if (deepEqual(content, incomingContent)) {
      return res.json(content);
    }

    treeToFiles(incomingContent, rootFolder);
    await saveAndSendContent(res, incomingContent, rootFolder);
  });

  router.post("/", async (req, res) => {
    const { topic, difficulty, parent } = req.body;
    try {
      if (!topicTitleIsUnique(topic, content)) {
        throw new Error(`topic title "${topic}" is not unique.`);
      } else if (parent) {
        content = addTopicToParent(content, parent, {
          title: topic,
          difficulty,
        });
        treeToFiles(content, rootFolder);
        await saveAndSendContent(res, content, rootFolder);
      } else {
        content = addTopicToTreeRoot(content, { title: topic, difficulty });
        treeToFiles(content, rootFolder);
        await saveAndSendContent(res, content, rootFolder);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

  router.get("/", async (req, res) => {
    if (typeof content !== "object" || Array.isArray(content)) {
      throw new Error(
        "timesplitter.json must contain an object with a 'title' and 'agenda' fields"
      );
    }

    if (!content.title) {
      throw new Error("timesplitter.json must contain a 'title' field");
    }

    if (!content.agenda || !Array.isArray(content.agenda)) {
      throw new Error("timesplitter.json must contain an agenda array");
    }

    res.send(content);
  });

  router.get("/:topicName", async (req, res) => {
    const { topicName } = req.params;
    let fileName =
      topicName.toLowerCase() === "overview"
        ? path.join(rootFolder, "README.md")
        : topicName.toLowerCase() === "instructions"
        ? path.join(rootFolder, "INSTRUCTIONS.md")
        : path.join(__dirname, "../build/index.html");
    try {
      res.send(await readFile(fileName, "UTF-8"));
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get("/agenda/:fullPath*", async (req, res) => {
    const [, , ...p] = req.url.split("/");
    const filePath = path.join(rootFolder, p.join("/"));
    try {
      const content = await readFile(`${filePath}.md`, "UTF-8");
      res.send(content);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

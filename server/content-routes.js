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
  replaceTopic,
  removeTopic,
  renameTopic,
} = require("./lib");
const deepEqual = require("deep-equal");

const readFile = promisify(fs.readFile);
const router = express.Router();

module.exports = function (rootFolder) {
  let content;
  try {
    content = loadContent(rootFolder);
    treeToFiles(content, rootFolder);
  } catch (error) {
    throw error;
  }

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

    content = loadContent(rootFolder);
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

  router.put("/topic-meta/:topicName", async (req, res) => {
    try {
      const { newTopic } = req.body;
      content = replaceTopic(content, newTopic);
      await saveAndSendContent(res, content, rootFolder);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

  router.delete("/:topicName", async (req, res) => {
    try {
      const { topicName } = req.params;
      content = removeTopic(content, topicName);
      treeToFiles(content, rootFolder);
      await saveAndSendContent(res, content, rootFolder);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

  router.put("/rename/:topicName", async (req, res) => {
    try {
      const { topicName } = req.params;
      const { newName } = req.body;
      content = renameTopic(content, topicName, newName);
      treeToFiles(content, rootFolder);
      await saveAndSendContent(res, content, rootFolder);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

  router.put("/markdown", async (req, res) => {
    const { fileName, fileContents } = req.body;
    try {
      const target = path.join(rootFolder, fileName.replace("agenda/", ""));
      fs.writeFileSync(target, fileContents);
      res.status(200).send(fileContents);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get("/agenda/:fullPath*", async (req, res) => {
    const [, , ...p] = req.url.split("/");
    const filePath = path.join(rootFolder, p.join("/"));
    try {
      const content = await readFile(`${filePath}.md`, "UTF-8");
      if (!content) {
        const [missingContentFile] = p.reverse();
        return res.send(`# TODO: Add Content For ${missingContentFile}`);
      }
      res.send(content);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

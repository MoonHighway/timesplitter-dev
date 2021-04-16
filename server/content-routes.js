const express = require("express");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const router = express.Router();

const topicTitlesOnly = topic => topic.title
const nestedTitlesOnly = (subTitles, topic) => [ ...subTitles, ...titlesOnly(topic)];
const titlesOnly = ({ agenda=[] }) => [...agenda.map(topicTitlesOnly), ...agenda.reduce(nestedTitlesOnly, [])];
const matchCase = rightString => leftString => leftString.toLowerCase() === rightString.toLowerCase()
const topicTitleIsUnique = (topicName, topic) => !titlesOnly(topic).some(matchCase(topicName));

function addTopicToTree(content, { title, difficulty="beginner", type="section", length=1, required=true }) {
  return {
    ...content,
    agenda: [
      ...content.agenda,
      {
        title,
        difficulty,
        type,
        length,
        required,
        agenda: []
      }
    ]
  };
}

async function saveAndSendContent(res, content, rootFolder) {
  try {
    await writeFile(path.join(rootFolder, "timesplitter.json"), JSON.stringify(content, null, 2));
  } catch (error) {
    console.error(error);
    res.json(error);
  }
  res.json(content);
}

module.exports = function (rootFolder) {

  let content = fs.readFileSync(
    path.join(rootFolder, "timesplitter.json"),
    "UTF-8"
  );
  
  try {
    content = JSON.parse(content);
  } catch (error) {
    let clearError = new Error(
      "There was an error parsing the timesplitter.json file"
    );
    console.error(clearError);
    throw error;
  }

  router.post("/", async (req, res) => {
    const { topic, difficulty } = req.body;
    console.log(`Adding ${topic} - ${difficulty}`)
    if (!topicTitleIsUnique(topic, content)) {
      const error = new Error(`topic title "${topic}" is not unique.`)
      console.error(error)
      res.status(500).json(error);
    } else {
      content = addTopicToTree(content, { title: topic, difficulty });
      await saveAndSendContent(res, content, rootFolder);
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

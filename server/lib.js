const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const writeFile = promisify(fs.writeFile);

const topicTitlesOnly = topic => topic.title
const nestedTitlesOnly = (subTitles, topic) => [ ...subTitles, ...titlesOnly(topic)];
const titlesOnly = ({ agenda=[] }) => [...agenda.map(topicTitlesOnly), ...agenda.reduce(nestedTitlesOnly, [])];
const matchCase = rightString => leftString => leftString.toLowerCase() === rightString.toLowerCase()
const topicTitleIsUnique = (topicName, topic) => !titlesOnly(topic).some(matchCase(topicName));

function addTopicToTree(content, { title, difficulty="beginner", type="section", required=true }) {
  return {
    ...content,
    agenda: [
      ...content.agenda,
      {
        title,
        difficulty,
        type,
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

function loadContent(rootFolder) {

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

  return content;
}

module.exports = {
    topicTitleIsUnique,
    saveAndSendContent,
    addTopicToTree,
    loadContent
}
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);

const urlFriendly = (str) => str.toLowerCase().replace(/ /g, "-").trim();

async function addTopicMarkdown(root, topicName, parentName) {
  // Set Folder and File
  const folder = path.join(root, urlFriendly(topicName));
  const markdownFile = `${folder}.md`;

  // Check for folder
  if (await exists(folder)) {
    throw new Error(
      `A folder called ${topicName} already exists at path: ${folder}`
    );
  }

  // Check for file
  if (await exists(markdownFile)) {
    throw new Error(
      `A markdown file for ${topicName} already exists at path: ${markdownFile}`
    );
  }

  await writeFile(markdownFile, "", "");
}

module.exports = {
  addTopicMarkdown,
};

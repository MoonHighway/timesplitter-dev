const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);

const urlFriendly = (str) => str.toLowerCase().replace(/ /g, "-").trim();

//
// TODO: Handle Adding
//
// [x] add file to existing parent
// [ ] add file to deeply nested parent
// [ ] when parent is file:
//     [ ] create parent file folder
//     [ ] move/rename parent md File
//     [ ] Add file to new parent folder
//

async function safetyCheck(folder, topicName, markdownFile, parentName) {
  if ((await exists(folder)) && !parentName)
    throw new Error(
      `A folder called ${topicName} already exists at path: ${folder}`
    );
  if (await exists(markdownFile))
    throw new Error(
      `A markdown file for ${topicName} already exists at path: ${markdownFile}`
    );
}

async function addTopicMarkdown(root, topicName, parentName) {
  let folder = parentName
    ? path.join(root, urlFriendly(parentName), urlFriendly(topicName))
    : path.join(root, urlFriendly(topicName));
  let markdownFile = `${folder}.md`;

  await safetyCheck(folder, topicName, markdownFile, parentName);
  await writeFile(markdownFile, "", "");
}

module.exports = {
  addTopicMarkdown,
};

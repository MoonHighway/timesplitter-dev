const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const urlFriendly = (str) => str && str.toLowerCase().trim().replace(/ /g, "-");
const buildFiles = (root, _trash) => (topic) => {
  const name = path.join(root, urlFriendly(topic.title));
  if (topic.agenda) {
    if (!fs.existsSync(name)) fs.mkdirSync(name);
    const subRoot = path.join(root, urlFriendly(topic.title));
    topic.agenda.forEach(buildFiles(subRoot, _trash));
  }

  const fullName = `${name}.md`;
  const trashItems = fs.readdirSync(_trash);
  const [fileName] = fullName.split("/").reverse();
  if (!fs.existsSync(fullName)) {
    if (trashItems.includes(fileName)) {
      fs.renameSync(path.join(_trash, fileName), fullName);
    } else {
      fs.writeFileSync(fullName, "");
    }
  }
};

const isMarkdownFile = (name) => name.match(/.md/);
const isDirectory = (name) => !name.match(/.md/);

function moveMarkdownToTrash(root, _trash) {
  const contents = fs
    .readdirSync(root)
    .filter((name) => !name.match(/_trash|_assets/));
  const markdown = contents.filter(isMarkdownFile);
  const directories = contents.filter(isDirectory);
  markdown.forEach((file) => {
    const oldPath = path.join(root, file);
    const newPath = path.join(_trash, file);
    fs.renameSync(oldPath, newPath);
  });
  directories.forEach((dir) => {
    const subRoot = path.join(root, dir);
    moveMarkdownToTrash(subRoot, _trash);
    rimraf.sync(subRoot);
  });
}

function treeToFiles(tree, root) {
  const _trash = path.join(root, "_trash");
  if (!fs.existsSync(_trash)) fs.mkdirSync(_trash);
  moveMarkdownToTrash(root, _trash);
  tree.agenda.forEach(buildFiles(root, _trash));
  rimraf.sync(_trash);
}

module.exports = {
  treeToFiles,
};

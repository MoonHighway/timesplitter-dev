const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const { urlFriendly } = require("./tree-to-files");
const writeFile = promisify(fs.writeFile);

const topicTitlesOnly = (topic) => topic.title;
const nestedTitlesOnly = (subTitles, topic) => [
  ...subTitles,
  ...titlesOnly(topic),
];
const titlesOnly = ({ agenda = [] }) => [
  ...agenda.map(topicTitlesOnly),
  ...agenda.reduce(nestedTitlesOnly, []),
];
const matchCase = (rightString) => (leftString) =>
  leftString.toLowerCase() === rightString.toLowerCase();
const topicTitleIsUnique = (topicName, topic) =>
  !titlesOnly(topic).some(matchCase(topicName));

function addTopicToTreeRoot(
  content,
  { title, difficulty = "beginner", type = "section", required = true }
) {
  return {
    ...content,
    agenda: [
      ...content.agenda,
      {
        title,
        difficulty,
        type,
        required,
        agenda: [],
      },
    ],
  };
}

function findTopicByTitle(content, title) {
  if (content.title.toLowerCase() === title.toLowerCase()) {
    return content;
  }
  if (content.agenda) {
    for (let i = 0; i < content.agenda.length; i++) {
      const topic = findTopicByTitle(content.agenda[i], title);
      if (topic) {
        return topic;
      }
    }
  }
}

const _replaceTopic = (topic) => (t) => {
  let newTopic = t;
  if (t.title === topic.title) {
    newTopic = topic;
  }

  if (newTopic.agenda) {
    return {
      ...newTopic,
      agenda: newTopic.agenda.map(_replaceTopic(topic)),
    };
  }

  return newTopic;
};

function replaceTopic(content, topic) {
  if (content.agenda) {
    return {
      ...content,
      agenda: content.agenda.map(_replaceTopic(topic)),
    };
  }

  return content;
}

function addTopicToParent(
  content,
  parent,
  { title, difficulty = "beginner", required = true }
) {
  let parentTopic = findTopicByTitle(content, parent);
  const type =
    parentTopic.type === "section"
      ? "sample"
      : !parentTopic.type
      ? "meta"
      : parentTopic.type.match(/sample|exercise|lab/)
      ? "step"
      : "meta";

  if (!parentTopic.agenda) {
    parentTopic.agenda = [];
  }

  parentTopic.agenda = [
    ...parentTopic.agenda,
    {
      title,
      difficulty,
      type,
      required,
      agenda: [],
    },
  ];
  return replaceTopic(content, parentTopic);
}

function removeExpanded(content) {
  let _content = content;
  delete _content.expanded;

  if (_content.agenda) {
    _content = {
      ..._content,
      agenda: _content.agenda.map(removeExpanded),
    };
  }

  return _content;
}

async function saveAndSendContent(res, content, rootFolder) {
  try {
    await writeFile(
      path.join(rootFolder, "timesplitter.json"),
      JSON.stringify(removeExpanded(content), null, 2)
    );
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

function removeTopic(content, topicTitle) {
  if (urlFriendly(content.title) === urlFriendly(topicTitle)) {
    return null;
  }

  if (content.agenda) {
    return {
      ...content,
      agenda: content.agenda
        .map((t) => removeTopic(t, topicTitle))
        .filter((t) => t),
    };
  }

  return content;
}

function renameTopic(content, oldName, newName) {
  if (urlFriendly(content.title) === oldName) {
    return {
      ...content,
      title: newName,
    };
  }

  if (content.agenda) {
    return {
      ...content,
      agenda: content.agenda.map((t) => renameTopic(t, oldName, newName)),
    };
  }

  return content;
}

module.exports = {
  topicTitleIsUnique,
  saveAndSendContent,
  addTopicToTreeRoot,
  loadContent,
  addTopicToParent,
  removeExpanded,
  replaceTopic,
  removeTopic,
  renameTopic,
};

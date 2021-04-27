export const toJSON = (res) => res.json();
export const toText = (res) => res.text();

export const throwIt = (msg) => (error) => {
  if (msg) {
    console.error(msg);
  }
  throw error;
};

export function toTree(o) {
  if (o.agenda) {
    const { agenda, ...fields } = o;
    return {
      ...fields,
      children: agenda.map(toTree),
    };
  }
  return o;
}

export function fromTree(o) {
  if (o.children) {
    const { children, ...fields } = o;
    return {
      ...fields,
      agenda: children.map(fromTree),
    };
  }
  return o;
}

export const totalTime = (topic = {}) => {
  if (topic.length) {
    return topic.length;
  }

  if (topic.children && topic.children.length) {
    return topic.children.reduce((total, topic) => {
      return total + totalTime(topic);
    }, 0);
  }
  return 0;
};

export function replenishExpanded(orig, exp) {
  let _return = orig;
  if (exp.hasOwnProperty("expanded")) {
    _return.expanded = exp.expanded;
  }

  if (_return.children) {
    _return = {
      ..._return,
      children: _return.children.map((topic, i) =>
        replenishExpanded(topic, exp.children[i])
      ),
    };
  }
  return _return;
}

const topicTitlesOnly = (topic) => topic.title;
const nestedTitlesOnly = (subTitles, topic) => [
  ...subTitles,
  ...titlesOnly(topic),
];
const titlesOnly = ({ children = [] }) => [
  ...children.map(topicTitlesOnly),
  ...children.reduce(nestedTitlesOnly, []),
];
const matchCase = (rightString) => (leftString) =>
  leftString.toLowerCase() === rightString.toLowerCase();
export const topicTitleIsUnique = (topicName, topic) =>
  !titlesOnly(topic).some(matchCase(topicName));

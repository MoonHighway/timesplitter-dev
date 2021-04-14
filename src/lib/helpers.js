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

const topicTitlesOnly = topic => topic.title
const nestedTitlesOnly = (subTitles, topic) => [ ...subTitles, ...titlesOnly(topic)];
const titlesOnly = ({ children=[] }) => [...children.map(topicTitlesOnly), ...children.reduce(nestedTitlesOnly, [])];
const matchCase = rightString => leftString => leftString.toLowerCase() === rightString.toLowerCase()
export const topicTitleIsUnique = (topicName, topic) => !titlesOnly(topic).some(matchCase(topicName));
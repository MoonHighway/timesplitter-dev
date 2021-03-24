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

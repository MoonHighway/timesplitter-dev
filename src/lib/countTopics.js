import { totalTime } from ".";

export const countByType = (
  topic,
  count = {
    samples: 0,
    slides: 0,
    labs: 0,
    exercises: 0,
  }
) => {
  if (topic.type === "sample") count.samples = count.samples + 1;
  if (topic.type === "slides") count.slides = count.slides + 1;
  if (topic.type === "lab") count.labs = count.labs + topic.children.length;
  if (topic.type === "exercise")
    count.exercises = count.exercises + topic.children.length;
  if (topic.children) {
    return topic.children.reduce((total, t) => countByType(t, total), count);
  }
  return count;
};

export const countByTime = (
  topic,
  count = {
    samples: 0,
    slides: 0,
    labs: 0,
    exercises: 0,
  }
) => {
  if (topic.type === "slides" && topic.length)
    count.slides = count.slides + topic.length;
  if (topic.type === "sample") count.samples = count.samples + totalTime(topic);
  if (topic.type === "lab") count.labs = count.labs + totalTime(topic);
  if (topic.type === "exercise")
    count.exercises = count.exercises + totalTime(topic);
  if (topic.children) {
    return topic.children.reduce((total, t) => countByTime(t, total), count);
  }
  return count;
};

export const countByDifficulty = (
  topic,
  count = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    expert: 0,
  }
) => {
  if (topic.difficulty) count[topic.difficulty]++;
  if (topic.children) {
    return topic.children.reduce(
      (total, t) => countByDifficulty(t, total),
      count
    );
  }
  return count;
};

// export const countByRequired = (
//   topic,
//   count = {
//     slides: 0,
//     samples: 0,
//     labs: 0,
//     exercises: 0,
//   }
// ) => {
//   if (topic.required) count[topic.type]++;
//   if (topic.children) {
//     return topic.children.reduce(
//       (total, t) => countByRequired(t, total),
//       count
//     );
//   }
//   return count;
// };

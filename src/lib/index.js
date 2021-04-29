import { colors } from "../theme";

export * from "./icons";
export * from "./TimeDisplay";
export * from "./Difficulty";
export * from "./Layout";
export * from "./helpers";
export * from "./setSelectedBranch";

export const getTypeColor = ({ type, required = false }) =>
  !required
    ? colors.notRequired
    : type === "section" || type === "meta"
    ? colors.meta
    : type === "exercise"
    ? colors.exercise
    : type === "lab" || type === "course-lab"
    ? colors.lab
    : type === "slides"
    ? colors.slides
    : type === "sample"
    ? colors.sample
    : colors.noTopic;

export const urlFriendly = (str) =>
  str && str.toLowerCase().trim().replace(/ /g, "-");

export function getTopicPath(topic, title, path = []) {
  const _title = urlFriendly(title);
  if (_title === urlFriendly(topic.title)) {
    return [...path, _title]
      .flat()
      .filter((x) => x)
      .join("/");
  }

  if (topic.agenda) {
    return topic.agenda
      .map((t) => getTopicPath(t, title, [...path, urlFriendly(topic.title)]))
      .flat()
      .filter((x) => x)
      .join("/");
  }
}

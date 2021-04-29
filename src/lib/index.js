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

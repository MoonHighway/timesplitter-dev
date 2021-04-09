export * from "./totalTime";
export * from "./icons";
export * from "./toTree";
export * from "./TimeDisplay";
export * from "./Difficulty";
export * from "./Layout";

export const toJSON = (res) => res.json();
export const toText = (res) => res.text();

export const throwIt = (msg) => (error) => {
  if (msg) {
    console.error(msg);
  }
  throw error;
};

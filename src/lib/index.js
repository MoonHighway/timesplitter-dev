export * from "./totalTime";
export * from "./icons";
export * from "./toTree";
export * from "./TimeDisplay";

export const toJSON = (res) => res.json();
export const toText = (res) => res.text();

export const throwIt = (msg) => (error) => {
  if (msg) {
    console.error(msg);
  }
  throw error;
};

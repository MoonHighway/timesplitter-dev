import { useState, useEffect } from "react";
import { toJSON, toText, throwIt } from "./lib";

export const useContent = () => {
  const [content, setContent] = useState();
  const url = "/content";
  useEffect(() => {
    if (content) return;
    fetch(url)
      .then(toJSON)
      .then(setContent)
      .catch(throwIt(`An error occurred while loading ${url}`));
  }, []);
  return content;
};

export const useContentFile = (path) => {
  const [content, setContent] = useState();
  const url = `/content${path}`;
  useEffect(() => {
    fetch(url)
      .then(toText)
      .then(setContent)
      .catch(throwIt(`An error occurred while loading ${url}`));
  }, [url]);
  return content;
};

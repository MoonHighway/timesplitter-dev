import { useState, useMemo, useEffect } from "react";
import { toJSON, toText, throwIt, toTree } from "./lib";

export const useContent = () => {
  const [content, setContent] = useState();
  const url = "/content";
  useEffect(() => {
    if (content) return;
    fetch(url)
      .then(toJSON)
      .then(setContent)
      .catch(throwIt(`An error occurred while loading ${url}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [content, setContent];
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

export function useTreeContent() {
  const [content, setContent] = useContent();
  const { title, children } = useMemo(() => {
    if (!content) return { title: "", children: [] };
    return toTree(content);
  }, [content]);

  const [data, setTree] = useState(children);

  useEffect(() => {
    if (!children.length) return;
    setTree(children);
  }, [children]);

  const addTopic = (topic, difficulty, parent) => {
    fetch(`/content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, difficulty, parent }),
    })
      .then(toJSON)
      .then((content) => {
        if (!content.title) {
          throw new Error(
            `Something went wrong while adding ${topic} to timesplitter.`
          );
        }
        setContent(content);
      })
      .then(setContent)
      .catch(console.error);
  };

  return { title, children, data, setTree, addTopic };
}

export function useInput(initVal) {
  const [value, onChange] = useState(initVal);
  useEffect(() => {
    if (!initVal) return;
    onChange(initVal);
  }, [initVal]);
  return {
    value,
    onChange,
  };
}

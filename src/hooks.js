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

export function useTreeContent() {
  const content = useContent();
  const { title, children } = useMemo(() => {
    if (!content) return { title: "", children: [] };
    return toTree(content);
  }, [content]);

  const [data, setTree] = useState(children);

  useEffect(() => {
    if (!children.length) return;
    setTree(children);
  }, [children]);

  return { title, children, data, setTree };
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

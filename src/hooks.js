import { useState, useMemo, useEffect } from "react";
import {
  toJSON,
  toText,
  throwIt,
  toTree,
  fromTree,
  replenishExpanded,
} from "./lib";

export const useContent = () => {
  const [content, setContent] = useState();
  const url = "/content";
  useEffect(() => {
    if (content) return;
    fetch(url)
      .then(toJSON)
      .then((c) => toTree(c))
      .then((c) => {
        const key = `@course-${c.title
          .toLowerCase()
          .replace(/ /g, "-")
          .trim()}`;
        const localContent = localStorage.getItem(key);
        if (localContent) {
          const _content = JSON.parse(localContent);
          return replenishExpanded(c, _content);
        }
        return c;
      })
      .then(setContent)
      .catch((error) => {
        console.error(error);
        throwIt(`An error occurred while loading ${url}`)(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!content || !content.title) return;
    const key = `@course-${content.title
      .toLowerCase()
      .replace(/ /g, "-")
      .trim()}`;
    localStorage.setItem(key, JSON.stringify(content));
  }, [content]);
  return [content, setContent];
};

export const useContentFile = (path) => {
  const [content, setContent] = useState();
  const url = `/content${path}`;
  console.log(url);
  useEffect(() => {
    if (!path) {
      console.log("empty Path");
      return;
    }
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
  const [selectedNode, setSelectedNode] = useState(
    localStorage.getItem(`@ts-selected-node`) &&
      JSON.parse(localStorage.getItem(`@ts-selected-node`))
  );

  useEffect(() => {
    if (!selectedNode) {
      localStorage.removeItem(`@ts-selected-node`);
      return;
    }
    localStorage.setItem(`@ts-selected-node`, JSON.stringify(selectedNode));
  }, [selectedNode]);

  useEffect(() => {
    if (!children.length) return;
    setTree(children);
  }, [children]);

  const sortTopics = (agenda) => {
    fetch(`/content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        fromTree({
          ...content,
          children: agenda,
        })
      ),
    })
      .then(toJSON)
      .then(toTree)
      .then((c) => replenishExpanded(c, { ...content, children: agenda }))
      .then(setContent)
      .catch(console.error);
  };

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
        setContent(toTree(content));
      })
      .then(setContent)
      .catch(console.error);
  };

  return {
    title,
    children,
    data,
    sortTopics,
    addTopic,
    selectedNode,
    setSelectedNode,
  };
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

export const useTopicTypeCount = (topics = []) =>
  useMemo(() => {
    // if (!topics || !topics.length) return;
    return {
      slides: 2,
      samples: 15,
      labSteps: 10,
      exerciseSteps: 7,
    };
  }, [topics]);

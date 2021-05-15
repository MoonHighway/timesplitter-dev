import { useState, useMemo, useEffect } from "react";
import {
  toJSON,
  toText,
  throwIt,
  toTree,
  fromTree,
  replenishExpanded,
  urlFriendly,
  countByType,
  countByTime,
  countByDifficulty,
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
  useEffect(() => {
    if (!path) {
      return;
    }
    fetch(`/content/${path}`)
      .then(toText)
      .then(setContent)
      .catch(throwIt(`An error occurred while loading ${path}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
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
      .catch(console.error);
  };

  const removeTopic = (topicName) => {
    fetch(`/content/${urlFriendly(topicName)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(toJSON)
      .then((content) => {
        if (!content.title) {
          throw new Error(
            `Something went wrong while removing ${topicName} to timesplitter.`
          );
        }
        setContent(toTree(content));
      })
      .catch(console.error);
  };

  const renameTopic = (oldName, newName) => {
    fetch(`/content/rename/${urlFriendly(oldName)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newName }),
    })
      .then(toJSON)
      .then((content) => {
        if (!content.title) {
          throw new Error(
            `Something went wrong while renaming "${oldName}" to "${newName}".`
          );
        }
        setContent(toTree(content));
      })
      .catch(console.error);
  };

  const updateTopicMeta = (oldTopic, newTopic) => {
    fetch(`/content/topic-meta/${urlFriendly(oldTopic.title)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newTopic: fromTree(newTopic) }),
    })
      .then(toJSON)
      .then((content) => {
        if (!content.title) {
          throw new Error(
            `Something went wrong while updating "${oldTopic.name}"`
          );
        }
        setContent(toTree(content));
      })
      .catch(console.error);
  };

  const saveMarkdown = (fileName, fileContents) => {
    fetch(`/content/markdown`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName, fileContents }),
    }).catch(console.error);
  };

  return {
    title,
    children,
    data,
    sortTopics,
    addTopic,
    removeTopic,
    renameTopic,
    updateTopicMeta,
    saveMarkdown,
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

export const useTopicCounts = (content) => {
  const [selectedCount, setSelectedCount] = useState("topics");
  const {
    slides = 0,
    samples = 0,
    labs = 0,
    exercises = 0,
  } = useMemo(() => {
    if (selectedCount === "time") {
      return countByTime(content);
    }
    return countByType(content);
  }, [content, selectedCount]);

  const {
    noDifficulty = 0,
    beginner = 0,
    intermediate = 0,
    advanced = 0,
    expert = 0,
  } = useMemo(() => {
    if (selectedCount !== "difficulty") return {};

    return countByDifficulty(content);
  }, [content, selectedCount]);

  return {
    selectedCount,
    setSelectedCount,
    slides,
    samples,
    labs,
    exercises,
    noDifficulty,
    beginner,
    intermediate,
    advanced,
    expert,
  };
};

import { useState, useEffect } from "react";
import { Tabs, Tab } from "react-tabs-adaptive";
import { useContentFile } from "../hooks";
import { getTopicPath, urlFriendly } from "../lib";
import { fonts } from "../theme";
import styled from "styled-components";
import debounce from "debounce";
import ErrorBoundary from "./ErrorBoundary";

const saveMarkdown = debounce((path, content, onChange) => {
  onChange(path, content);
}, 1000);

export default function TopicMarkdown({ content, title, onChange = (f) => f }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [path, setPath] = useState(
    getTopicPath(content, title).replace(urlFriendly(content.title), "agenda")
  );
  const md = useContentFile(path);
  const [_md, setMD] = useState(md);

  const updateMarkdown = (e) => {
    setMD(e.target.value);
    saveMarkdown(`${path}.md`, e.target.value, onChange);
  };

  useEffect(() => {
    if (!md) return;
    setMD(md);
  }, [md]);

  useEffect(() => {
    if (!title) return;
    setPath(
      getTopicPath(content, title).replace(urlFriendly(content.title), "agenda")
    );
  }, [title]);

  if (!md) {
    return <p>Something went wrong while locating Markdown content.</p>;
  }

  return (
    <Container>
      <ErrorBoundary>
        <Tabs activeTabIndex={tabIndex}>
          <Tab tabName="Presenter Notes" selectTab={setTabIndex}>
            <textarea value={_md} onChange={updateMarkdown} />
          </Tab>
          <Tab tabName="Preview" selectTab={setTabIndex}>
            Preview
          </Tab>
        </Tabs>
      </ErrorBoundary>
    </Container>
  );
}

const Container = styled.div`
  grid-area: 3 / 2 / 11 / 5;
  flex-grow: 1;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .Tabs {
    width: calc(100% - 40px);
    height: calc(100% - 116px);
    margin: 0 55px;
    display: flex;
    flex-direction: column;
  }

  .Tabs-Active-Content {
    height: 100%;
  }

  textarea {
    font-family: ${fonts.text};
    font-size: 1.5em;
    padding: 0.5em;
    overflow-x: scroll;
    width: 100%;
    border: none;
    resize: none;
    min-height: calc(100% - 1em - 60px);
    background-color: transparent;
    overflow-y: scroll;
  }
`;

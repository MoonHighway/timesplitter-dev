import { useState, useEffect } from "react";
import { useContentFile } from "../hooks";
import { getTopicPath, urlFriendly } from "../lib";
import { fonts } from "../theme";
import styled from "styled-components";

export default function TopicMarkdown({ content, title }) {
  const [path, setPath] = useState(
    getTopicPath(content, title).replace(urlFriendly(content.title), "agenda")
  );
  const md = useContentFile(path);

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
      <textarea value={md} readOnly={true} />
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

  textarea {
    width: calc(100% - 40px);
    height: calc(100% - 116px);
    margin: 20px;
    font-family: ${fonts.text};
    font-size: 1.5em;
    padding: 0.5em;
    overflow-x: scroll;
  }
`;

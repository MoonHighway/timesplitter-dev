import { useContentFile } from "../hooks";
import { getTopicPath, urlFriendly } from "../lib";
import { fonts } from "../theme";
import styled from "styled-components";

export default function TopicMarkdown({ content, title }) {
  const url = getTopicPath(content, title).replace(
    urlFriendly(content.title),
    "agenda"
  );

  const md = useContentFile(`/${url}`);

  if (!md) {
    return <p>Something went wrong while locating Markdown content.</p>;
  }

  return (
    <Container>
      <textarea defaultValue={md} />
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

import styled from "styled-components";

export default function TopicMarkdown() {
  return (
    <Container>
      <textarea defaultValue="Insert Markdown Here" />
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
  }
`;

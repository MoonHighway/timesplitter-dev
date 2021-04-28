import styled from "styled-components";

export default function TopicMarkdown() {
  return (
    <Container>
      <textarea>Insert Markdown Text Here</textarea>
    </Container>
  );
}

const Container = styled.div`
  grid-area: 3 / 2 / 11 / 5;
  height: calc(100% - 160px);
  display: flex;
  justify-content: center;
  align-items: center;

  textarea {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
  }
`;

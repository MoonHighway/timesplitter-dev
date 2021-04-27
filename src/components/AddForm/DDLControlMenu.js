import styled from "styled-components";

export default function DDLControlMenu({ selectedValue="beginner", size="sm" }) {
  return (
    <Container>
      <p>TODO: Expand/Collapse</p>
    </Container>
  );
}

const Container = styled.div`
  background-color: #acacac;
  color: #eee;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  p {
    margin: 7px;
    padding: 7px;
    font-size: 1.2em;
  }
`;

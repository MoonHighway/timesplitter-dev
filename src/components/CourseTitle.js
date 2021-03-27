import { TimeDisplay, totalTime } from "../lib";
import styled from "styled-components";

export default function CourseTitle({ title, topics = [] }) {
  return (
    <Container>
      <h1>{title}</h1>
      <p>
        <TimeDisplay size={25} time={totalTime({ children: topics })} />
      </p>
    </Container>
  );
}

const Container = styled.div`
  grid-area: 1 / 2 / 2 / 5;
`;

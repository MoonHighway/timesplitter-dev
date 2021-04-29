import {
  TimeDisplay,
  DifficultyDropDown,
  TopicTypeSelect,
  totalTime,
} from "../lib";
import styled from "styled-components";

export default function TopicMeta(node) {
  return (
    <Container>
      <Row>
        <h2>{node.title}</h2>
        <button>[SAVE] Save</button>
      </Row>
      <Row>
        <Row>
          <input type="checkbox" defaultChecked={node.required || false} />{" "}
          required
        </Row>
        <TimeDisplay time={totalTime(node)} />
        <Row>
          <input type="checkbox" defaultChecked={node.locked || false} /> [LOCK]
        </Row>
        <DifficultyDropDown selectedValue={node.difficulty || "beginner"} />
        <Row>
          <TopicTypeSelect selectedValue={node.type} />
        </Row>
        <Row>[OPEN] Timesplitter</Row>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

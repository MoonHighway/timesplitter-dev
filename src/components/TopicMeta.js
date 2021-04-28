import { TimeDisplay, DifficultyDropDown } from "../lib";
import styled from "styled-components";

export default function TopicMeta() {
  return (
    <Container>
      <Row>
        <h2>Topic Title</h2>
        <button>[SAVE] Save</button>
      </Row>
      <Row>
        <Row>
          <input type="checkbox" defaultChecked={true} /> required
        </Row>
        <TimeDisplay time={120} />
        <Row>
          <input type="checkbox" defaultChecked={true} /> [LOCK]
        </Row>
        <DifficultyDropDown selectedValue="beginner" />
        <Row>
          <select>
            <option>section</option>
            <option>meta</option>
            <option>sample</option>
            <option>exercise</option>
            <option>lab</option>
            <option>step</option>
          </select>
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

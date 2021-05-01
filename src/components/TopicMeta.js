import { useState, useEffect } from "react";
import { DifficultyDropDown, TopicTypeSelect } from "../lib";
import { fonts } from "../theme";
import styled from "styled-components";

export default function TopicMeta(node) {
  const [title, setTitle] = useState(node.title);
  const [type, setType] = useState(node.type);
  const [length, setLength] = useState(node.length || 0);
  const [required, setRequired] = useState(node.required || false);
  const [locked, setLocked] = useState(node.locked || false);
  const [difficulty, setDifficulty] = useState(node.difficulty || false);

  useEffect(() => setTitle(node.title), [node.title]);
  useEffect(() => setType(node.type), [node.type]);
  useEffect(() => setRequired(node.required), [node.required]);
  useEffect(() => setLocked(node.locked), [node.locked]);
  useEffect(() => setDifficulty(node.difficulty), [node.difficulty]);

  return (
    <Container>
      <Row>
        <Title
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <button>[SAVE] Save</button>
        <button>[DELETE] Save</button>
      </Row>
      <Row>
        <Row>
          <TopicTypeSelect selectedValue={type} onChange={setType} />
          <DifficultyDropDown
            selectedValue={difficulty}
            onChange={setDifficulty}
          />
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          time ]
          <input
            type="checkbox"
            value={required}
            onChange={(e) => setRequired(e.target.checked)}
          />{" "}
          required
          <input
            type="checkbox"
            value={locked}
            onChange={(e) => setLocked(e.target.checked)}
          />{" "}
          [LOCK]
        </Row>

        <button>[OPEN] Timesplitter</button>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 20px 40px;

  .topic-type-drop-down {
    margin-left: 12px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.input`
  border: none;
  flex-grow: 1;
  font-family: ${fonts.subtitle};
  font-size: 3em;
  padding: 0.25em;
  font-weight: bold;
  outline: none;
`;

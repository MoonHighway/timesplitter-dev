import { useState, useEffect } from "react";
import {
  Checkbox,
  DifficultyDropDown,
  TopicTypeSelect,
  TimeInput,
  totalTime,
  parentTime,
  Required,
  Lock,
} from "../lib";
import { fonts, colors } from "../theme";
import styled from "styled-components";

export default function TopicMeta({ content, node }) {
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
  useEffect(() => setLength(node.length), [node.length]);

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
        <Row style={{ width: "100%" }}>
          <TopicTypeSelect selectedValue={type} onChange={setType} />
          <DifficultyDropDown
            selectedValue={difficulty}
            onChange={setDifficulty}
            size="md"
          />
          <Checkbox
            checked={required}
            icon={<Required fill={required ? colors.required : colors.bland} />}
            checkedLabel="required"
            uncheckedLabel="not required"
            checkedColor={colors.required}
            uncheckedColor={colors.bland}
            onChange={setRequired}
          />

          <Row style={{ flexGrow: 1, justifyContent: "flex-start" }}>
            <TimeInput
              topicTime={length}
              agendaTime={totalTime(node)}
              parentTime={parentTime(content, node.title)}
              onChange={setLength}
            />
            {length && (
              <Checkbox
                checked={locked}
                icon={
                  <Lock
                    locked={locked}
                    fill={locked ? colors.beginner : colors.bland}
                  />
                }
                checkedLabel="locked"
                uncheckedLabel="not locked"
                onChange={setLocked}
              />
            )}
          </Row>
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

  .difficulty-drop-down {
    margin-right: 30px;
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

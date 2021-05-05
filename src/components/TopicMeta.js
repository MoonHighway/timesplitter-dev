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
import deepEqual from "deep-equal";
import styled from "styled-components";
import debounce from "debounce";

const saveTitle = debounce((oldTitle, newTitle, onRename = (f) => f) => {
  if (oldTitle !== newTitle) onRename(oldTitle, newTitle);
}, 2000);

export default function TopicMeta({
  content,
  node,
  onChange = (f) => f,
  onRename = (f) => f,
  onRemove = (f) => f,
}) {
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

  useEffect(() => {
    const newNode = {
      ...node,
    };
    if (node.hasOwnProperty("type") || type) newNode.type = type;
    if (node.hasOwnProperty("required") || required)
      newNode.required = required;
    if (!!length) newNode.length = length;
    if (!!difficulty) newNode.difficulty = difficulty;
    if (!!locked) newNode.locked = locked;
    if (!deepEqual(newNode, node)) onChange(node, newNode);
  }, [type, difficulty, required, length, locked]);

  useEffect(() => {
    if (!title) return;
    if (node.title !== title) saveTitle(node.title, title, onRename);
  }, [title]);

  const removeTopic = () => {
    if (node.children && node.children.length)
      return alert(`Remove ${title}'s ${node.children.length} children first`);
    if (
      window.confirm(
        `Are you sure you want to remove "${title}" and all of it's content from this course. This action cannot be undone.`
      )
    )
      onRemove(node.title);
  };

  return (
    <Container>
      <Row>
        <Title
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <button onClick={removeTopic}>[DELETE] Save</button>
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
              onChange={(length) => setLength(parseInt(length))}
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

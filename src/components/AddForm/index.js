import { useState, useEffect } from "react";
import DDLControlMenu from "./DDLControlMenu";
import styled from "styled-components";
import { DifficultyDropDown, topicTitleIsUnique } from "../../lib";
import { fonts } from "../../theme";

export default function AddForm({
  title = "",
  difficulty = "beginner",
  agenda = [],
  onNewTopic = (f) => f,
}) {
  const [_title, setTitle] = useState(title);
  const [_difficulty, setDifficulty] = useState(difficulty);

  useEffect(() => {
    if (title !== _title) setTitle(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    if (difficulty !== _difficulty) setDifficulty(difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const sendTopic = () => {
    if (!topicTitleIsUnique(_title, { children: agenda })) {
      return alert(`The title "${_title}" is not unique for this course`);
    }
    onNewTopic(_title, _difficulty);
    setTitle("");
    setDifficulty("beginner");
  };

  return (
    <Container>
      <BarOne>
        <input
          value={_title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="new topic"
        ></input>
        <DifficultyDropDown
          selectedValue={_difficulty}
          size="sm"
          onChange={setDifficulty}
        />

        <Button disabled={_title.trim() === ""} onClick={sendTopic}>
          Add
        </Button>
      </BarOne>
      <DDLControlMenu />
    </Container>
  );
}

const Button = styled.button`
  min-width: 50px;
  margin: 5px;
  margin-left: 0;
  border-radius: 8px;
  border: solid: 1px #CCC;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const BarOne = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  input {
    flex-grow: 1;
    margin: 5px;
    border-radius: 5px;
    border: solid 1px #ccc;
    padding: 0 10px;
    font-family: ${fonts.subTitle};
    font-size: 1.2em;
  }
`;

const Container = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

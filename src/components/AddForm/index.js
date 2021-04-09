import { useState, useEffect } from "react";
import DDLControlMenu from "./DDLControlMenu";
import styled from "styled-components";
import { DifficultyDropDown } from "../../lib";
import { fonts } from "../../theme";

export default function AddForm({
  title = "",
  difficulty = "beginner",
  onNewTopic = (f) => f,
}) {
  const [_title, setTitle] = useState(title);
  const [_difficulty, setDifficulty] = useState(difficulty);

  useEffect(() => {
    if (title !== _title) setTitle(title);
  }, [title]);

  useEffect(() => {
    if (difficulty !== _difficulty) setDifficulty(difficulty);
  }, [difficulty]);

  return (
    <Container>
      <BarOne>
          <input
            value={_title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="new topic"
          ></input>
          <DifficultyDropDown selectedValue={difficulty} size="sm" />

        <Button
          disabled={_title.trim() === ""}
          onClick={() => onNewTopic(_title, _difficulty)}
        >
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
    border: solid 1px #CCC;
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

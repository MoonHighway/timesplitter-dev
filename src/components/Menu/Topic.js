import { TimeDisplay, Difficulty } from "../../lib";
import styled from "styled-components";

export default function Topic({
  time,
  difficulty = "beginner",
  length,
  title,
  onClick=f=>f,
}) {
  return (
    <Details difficulty={difficulty} onClick={onClick}>
      <h1>{title}</h1>
      <div>
        <DifficultyInfo difficulty={difficulty}>
          <Difficulty level={difficulty} /> {difficulty}
        </DifficultyInfo>
        <TimeDisplay time={length || time} />
      </div>
    </Details>
  );
}

const Details = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    padding-top: 2px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    margin-left: 1.5em;
    color: #898989;
    font-size: 10px;
    svg {
      position: relative;
      top: 1px;
      ${(props) =>
        props.difficulty
          ? `
      &:first-of-type {
        margin-right: 5px;
      }
      `
          : ""}
    }
  }
`;

const DifficultyInfo = styled.div`
  margin-right: 1em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) =>
    props.difficulty === "intermediate"
      ? "blue"
      : props.difficulty.match(/advanced|expert/)
      ? "black"
      : "green"};
`;

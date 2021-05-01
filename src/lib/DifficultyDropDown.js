import { useState, useEffect } from "react";
import { GreenCircle, BlueSquare, BlackDiamond, DoubleDiamond } from ".";
import { fonts } from "../theme";
import Select from "react-select";
import styled from "styled-components";

function useDifficultyOptions(value) {
  const [selected, setSelected] = useState();
  const options = [
    { value: "beginner", label: <GreenCircle /> },
    { value: "intermediate", label: <BlueSquare /> },
    { value: "advanced", label: <BlackDiamond /> },
    { value: "expert", label: <DoubleDiamond /> },
  ];

  useEffect(() => {
    if (!value) return;
    setSelected(options.find((item) => item.value === value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    selected,
    options,
    setDifficulty: (value) =>
      setSelected(options.find((item) => item.value === value)),
  };
}

export function DifficultyDropDown({
  selectedValue = "beginner",
  size = "sm",
  onChange = (f) => f,
}) {
  const { selected, options, setDifficulty } = useDifficultyOptions(
    selectedValue
  );

  useEffect(() => {
    setDifficulty(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <Container className="difficulty-drop-down">
      <Select
        value={selected}
        options={options}
        onChange={({ value }) => {
          onChange(value);
          setDifficulty(value);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  margin: 5px;

  font-family: ${fonts.subtitle};
  font-size: 1.2em;
  padding: 0.2em;

  &.topic-type-drop-down {
    width: 200px;
  }

  > div:first-child {
    width: 100px;
  }
  div[class$="control"],
  div[class$="ValueContainer"],
  div[class$="IndicatorsContainer"] {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .prefix__input {
    color: transparent;
  }
`;

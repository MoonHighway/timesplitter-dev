import { useState, useEffect } from "react";
import Select from "react-select";
import { BsDiamondFill } from "react-icons/bs";
import { FaSquare, FaCircle } from "react-icons/fa";
import styled from "styled-components";

const Double = styled.div`
  float: left;
  svg:last-of-type {
    position: relative;
    left: -5px;
  }
`;

export const GreenCircle = ({ size = 25, ...props }) => (
  <FaCircle color="limegreen" size={size} {...props} />
);

export const BlueSquare = ({ size = 25, ...props }) => (
  <FaSquare color="#6c6cfd" size={size} {...props} />
);

export const BlackDiamond = ({ size = 25, ...props }) => (
  <BsDiamondFill color="black" size={size} {...props} />
);

export const DoubleDiamond = ({ size = 25, ...props }) => (
  <Double {...props}>
    <BsDiamondFill color="black" size={size} />
    <BsDiamondFill color="black" size={size} />
  </Double>
);

export const Difficulty = ({ level, size = 12 }) =>
  level === "intermediate" ? (
    <BlueSquare size={size} />
  ) : level === "advanced" ? (
    <BlackDiamond size={size} />
  ) : level === "expert" ? (
    <DoubleDiamond size={size} />
  ) : level === "beginner" ? (
    <GreenCircle size={size} />
  ) : null;

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

import { useState, useEffect } from "react";
import { fonts } from "../theme";
import Select from "react-select";
import styled from "styled-components";

function useTopicTypeOptions(value = "step") {
  const [selected, setSelected] = useState(value);
  const options = [
    { value: "section", label: "section" },
    { value: "meta", label: "meta" },
    { value: "slides", label: "slides" },
    { value: "sample", label: "sample" },
    { value: "exercise", label: "exercise" },
    { value: "lab", label: "lab" },
    { value: "step", label: "step" },
  ];

  useEffect(() => {
    if (!value) return;
    setSelected(options.find((item) => item.value === value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    selected,
    options,
    setType: (value) =>
      setSelected(options.find((item) => item.value === value)),
  };
}

export function TopicTypeSelect({
  selectedValue = "sample",
  onChange = (f) => f,
}) {
  const { selected, options, setType } = useTopicTypeOptions(selectedValue);

  useEffect(() => {
    setType(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <Container className="topic-type-drop-down">
      <Select
        value={selected}
        options={options}
        onChange={({ value }) => {
          onChange(value);
          setType(value);
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

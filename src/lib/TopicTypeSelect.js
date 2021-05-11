import { useState, useEffect } from "react";
import { fonts, colors } from "../theme";
import { TopicIcon } from ".";
import Select from "react-select";
import styled from "styled-components";

function useTopicTypeOptions(value = "step") {
  const [selected, setSelected] = useState(value);
  const options = [
    {
      value: "section",
      label: (
        <>
          <TopicIcon type="section" fill={colors.primaryLight} />
          <span>section</span>
        </>
      ),
    },
    {
      value: "meta",
      label: (
        <>
          <TopicIcon type="meta" fill={colors.meta} />
          <span>meta</span>
        </>
      ),
    },
    {
      value: "slides",
      label: (
        <>
          <TopicIcon type="slides" fill={colors.slides} />
          <span>slides</span>
        </>
      ),
    },
    {
      value: "sample",
      label: (
        <>
          <TopicIcon type="sample" fill={colors.sample} />
          <span>sample</span>
        </>
      ),
    },
    {
      value: "exercise",
      label: (
        <>
          <TopicIcon type="exercise" fill={colors.exercise} />
          <span>exercise</span>
        </>
      ),
    },
    {
      value: "lab",
      label: (
        <>
          <TopicIcon type="lab" fill={colors.lab} />
          <span>lab</span>
        </>
      ),
    },
    {
      value: "step",
      label: (
        <>
          <TopicIcon type="step" fill={colors.darkbland} />
          <span>step</span>
        </>
      ),
    },
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

  > div:first-child {
    width: 200px;
  }

  div[class$="singleValue"] {
    display: flex;
    align-items: center;
    font-weight: bold;
    svg {
      margin-right: 10px;
    }
  }

  div[class$="menu"] {
    svg {
      margin-right: 20px;
    }
    span {
      position: relative;
      top: -5px;
    }
  }

  div[class$="control"],
  div[class$="ValueContainer"],
  div[class$="IndicatorsContainer"] {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0.2em;
  }

  .prefix__input {
    color: transparent;
  }
`;

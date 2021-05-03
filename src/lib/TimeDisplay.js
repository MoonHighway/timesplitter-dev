import { useState, useReducer, useEffect, useRef } from "react";
import { Timer, Lock } from ".";
import { fonts, colors } from "../theme";
import styled from "styled-components";

export function TimeDisplay({ time, locked = false, size = 12, ...props }) {
  if (time >= 60) {
    let h = Math.floor(time / 60);
    let m = time % 60;
    const message = `${h} hour${h > 1 ? "s" : ""} ${
      m > 0 ? `${m} minutes` : ""
    }`;

    return (
      <>
        {locked ? (
          <Lock
            locked={true}
            size={size}
            fill={colors.bland}
            style={{ position: "relative", top: "-2px" }}
          />
        ) : (
          <Timer size={size} {...props} />
        )}
        {message}
      </>
    );
  }

  if (time) {
    return (
      <>
        {locked ? (
          <Lock
            locked={true}
            size={size}
            fill={colors.bland}
            style={{ position: "relative", top: "-2px" }}
          />
        ) : (
          <Timer size={size} {...props} />
        )}
        <span {...props}>{time} minutes</span>
      </>
    );
  }

  return null;
}

//
// TimeInput States and Functionality
//
//   [x] topic has a length (time) - Display Length, enabled component
//   [ ] topic is a parent and length can be totaled - Display Length, disabled component
//   [ ] FN - Look up the tree until parent time is found
//   [ ] FN - Distribute Parent Time down the tree for each component's approximate
//   [ ] topic is a child without a length - Disabled Length, display approx
//

export function TimeInput({
  topicTime,
  agendaTime,
  parentTime,
  onChange = (f) => f,
  ...props
}) {
  const [editing, toggleEditing] = useReducer((x) => !x, false);
  const [_time, setTime] = useState(topicTime);
  const _input = useRef();

  const changeTime = (e) => {
    onChange(e.target.value);
    toggleEditing();
  };

  useEffect(() => {
    setTime(topicTime);
  }, [topicTime]);

  useEffect(() => {
    if (editing) {
      _input.current.focus();
      _input.current.select();
    }
  }, [editing]);

  if (!_time) {
    if (!!agendaTime) {
      return (
        <Container {...props}>
          <TimeDisplay
            locked={true}
            time={agendaTime}
            style={{ color: colors.bland, cursor: "not-allowed" }}
            size={35}
            onClick={() =>
              alert(
                `Time values are sent in child topics. In order to set the time for this topic you must remove the time associated with each child topic.`
              )
            }
          />
        </Container>
      );
    }

    if (!!parentTime) {
      return <Container {...props}>{parentTime}</Container>;
    }

    return null;
  }

  if (editing) {
    return (
      <Container {...props}>
        <Timer size={35} />
        <input
          ref={_input}
          type="number"
          value={_time}
          min={1}
          max={1 * 60 * 24}
          onChange={(e) => setTime(e.target.value)}
          onBlur={changeTime}
          onKeyPress={(e) => e.key === "Enter" && changeTime(e)}
        />{" "}
        <span>minutes</span>
      </Container>
    );
  }

  return (
    <Container {...props} onClick={toggleEditing}>
      <TimeDisplay time={_time} size={35} />
    </Container>
  );
}

const Container = styled.div`
  margin: 0 25px;
  font-family: ${fonts.subtitle};
  color: ${colors.darkhard};
  font-weight: bold;
  font-size: 1.2em;

  cursor: pointer;

  display: flex;
  align-items: center;

  svg {
    margin-right: 7px;
  }

  input[type="number"] {
    font-family: ${fonts.subtitle};
    font-size: 1.2em;
    padding: 0.2em;
    width: 60px;
  }
  span {
    margin-left: 5px;
  }
`;

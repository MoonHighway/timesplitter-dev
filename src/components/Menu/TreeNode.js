import Topic from "./Topic";
import { Draggable, Expandable } from "./DragDrop";
import { TopicIcon, totalTime } from "../../lib";
import { colors } from "../../theme";
import styled from "styled-components";

export default function TreeNode({ node, onSelect = (f) => f }) {
  return (
    <Container>
      <Expandable node={node} />
      <Node
        selected={node.selected}
        type={node.node.type}
        required={node.node.required}
        onClick={() => {
          if (node.selected) onSelect();
          else onSelect(node.node.title);
        }}
      >
        <Draggable connectDragSource={node.connectDragSource}>
          <Handle type={node.node.type} required={node.node.required}>
            <TopicIcon type={node.node.type} />
          </Handle>
        </Draggable>
        <Topic time={totalTime(node.node)} {...node.node} />
      </Node>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Handle = styled.div`
  height: 50px;
  width: 50px;
  cursor: grab;
  background-color: ${({ type, required }) =>
    required !== true
      ? colors.notRequired
      : type === "section" || type === "meta"
      ? colors.meta
      : type === "exercise"
      ? colors.exercise
      : type === "lab" || type === "course-lab"
      ? colors.lab
      : type === "slides"
      ? colors.slides
      : type === "sample"
      ? colors.sample
      : colors.noTopic};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: #003;
  }
`;

const Node = styled.div`
  opacity: ${({ required }) => (required === true ? "1" : "0.5")};
  cursor: pointer;
  background-color: ${({ required, selected, type }) =>
    selected === true
      ? type === "section" || type === "meta"
        ? "lightblue"
        : type === "exercise"
        ? "#daade6"
        : type === "lab" || type === "course-lab"
        ? "#ade6bb"
        : type === "slides"
        ? "#e6adad"
        : type === "sample"
        ? "#e6e1ad"
        : "#adb2e5"
      : required === true
      ? "white"
      : "#E0E0E0"};
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  top: 10px;
  border: solid 1px #ababab;
  box-shadow: 3px 3px 10px 1px rgb(0 0 0 / 6%);
  min-width: 320px;
  h1 {
    margin: 0;
    margin-left: 1em;
    padding: 0;
    font-size: 1em;
  }
`;

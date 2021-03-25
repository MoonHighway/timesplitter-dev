import Topic from "./Topic";
import { Draggable, Expandable } from "./DragDrop";
import { TopicIcon, totalTime } from "../../lib";
import styled from "styled-components";

export default function TreeNode({ node }) {
  return (
    <div style={{ position: "relative" }}>
      <Expandable node={node} />
      <Node required={node.node.required}>
        <Draggable connectDragSource={node.connectDragSource}>
          <Handle type={node.node.type} required={node.node.required}>
            <TopicIcon type={node.node.type} />
          </Handle>
        </Draggable>
        <Topic time={totalTime(node.node)} {...node.node} />
      </Node>
    </div>
  );
}

const Handle = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${({ type, required }) =>
    required !== true
      ? "#E0E0E0"
      : type === "section" || type === "meta"
      ? "lightblue"
      : type === "exercise"
      ? "#daade6"
      : type === "lab" || type === "course-lab"
      ? "#ade6bb"
      : type === "slides"
      ? "#e6adad"
      : type === "sample"
      ? "#e6e1ad"
      : "#adb2e5"};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: #003;
  }
`;

const Node = styled.div`
  opacity: ${({ required }) => (required === true ? "1" : "0.5")};
  background-color: ${({ required }) =>
    required === true ? "white" : "#E0E0E0"};
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
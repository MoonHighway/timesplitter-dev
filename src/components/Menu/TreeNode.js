import Topic from "./Topic";
import { Draggable, Expandable } from "./DragDrop";
import { TopicIcon, totalTime, getTypeColor } from "../../lib";
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
          else onSelect(node.node);
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
  background-color: ${getTypeColor};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: #003;
  }
`;

const Node = styled.div`
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${({ required, selected, type }) =>
    selected === true
      ? getTypeColor({ type, required: true })
      : required === true
      ? "white"
      : "#ABABAB"};
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  top: 10px;
  box-shadow: 3px 3px 10px 1px rgb(0 0 0 / 6%);
  min-width: 320px;
  h1 {
    margin: 0;
    margin-left: 1em;
    padding: 0;
    font-size: 1em;
  }
`;

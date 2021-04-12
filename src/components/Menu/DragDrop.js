import styled from "styled-components";

export function Draggable({ connectDragSource, children }) {
  return connectDragSource(<div>{children}</div>);
}

export function Expandable({ node, onExpand = f=>f }) {
  const { expanded = false, children = [] } = node.node;

  return children.length > 0 ? (
    <Expand
      expanded={expanded}
      onClick={() => {
        onExpand(expanded);
        node.toggleChildrenVisibility(node)
      }}
    />
  ) : null;
}

const Expand = styled.div`
  :before {
    content: "${({ expanded }) => (expanded ? "-" : "+")}";
  }
  position: absolute;
  height: 15px;
  width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 19px;
  left: -33px;
  padding: 0.2em;
  background-color: white;
  border: solid 1px black;
  border-radius: 50%;
  cursor: pointer;
`;

export const DropTarget = styled.div`
  height: 41px;
  width: 30px;
  background-color: #ededed;
  border: dashed 5px #ababab;
  /* margin: 20px 0; */
  min-width: 320px;
  top: 7px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h1 {
    margin: 0;
    margin-left: calc(1em + 50px);
    padding: 0;
    font-size: 1em;
    color: #9a9a9a;
  }
`;

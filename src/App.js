import { useState, useMemo, useEffect } from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";
import styled from "styled-components";
import { TopicIcon, Timer, Difficulty } from "./icons";
import { useContent } from "./hooks";
import { totalTime } from "./totalTime";

//
//  TODO: Make Work Cool
//
//   [ ] Refactor Code
//   [ ] Expand All
//   [ ] Collapse All
//   [ ] Add a button to add a new section node
//   [ ] Click Button to add new section
//   [ ] Add button to node to add children
//   [ ] Add child nodes to the node
//   [ ] Rename node in place
//   [ ] Remove node
//

//
//  TODO: Create a Form for Details
//
//   [ ] Overall Grid Layout with form placement
//   [ ] Select Node From tree
//   [ ] Display Title of Selected node
//   [ ] Indicate selected node
//   [ ] Display/Select Default Node
//   [ ] Time Drop Down List
//   [ ] Lock Time Checkbox
//   [ ] Difficulty Drop Down List
//   [ ] Placeholder for Content
//   [ ] Change title
//   [ ] Change Difficulty
//   [ ] Change Time
//   [ ] Lock Time
//   [ ] Indicate Time Lock in menu
//

function toTree(o) {
  if (o.agenda) {
    const { agenda, ...fields } = o;
    return {
      ...fields,
      children: agenda.map(toTree),
    };
  }
  return o;
}

function Draggable({ connectDragSource, children }) {
  return connectDragSource(<div>{children}</div>);
}

function Expandable({ node }) {
  const { expanded = false, children = [] } = node.node;
  return children.length > 0 ? (
    <Expand
      expanded={expanded}
      onClick={() => node.toggleChildrenVisibility(node)}
    />
  ) : null;
}

function TimeDisplay({ time, size = 12 }) {
  if (time >= 60) {
    let h = Math.floor(time / 60);
    let m = time % 60;
    const message = `${h} hour${h > 1 ? "s" : ""} ${
      m > 0 ? `${m} minutes` : ""
    }`;

    return (
      <>
        <Timer size={size} />
        {message}
      </>
    );
  }

  if (time) {
    return (
      <>
        <Timer size={size} /> {time} minutes
      </>
    );
  }

  return null;
}

export default function App() {
  const content = useContent();
  const { title, children } = useMemo(() => {
    if (!content) return { title: "", children: [] };
    return toTree(content);
  }, [content]);
  const [data, setTree] = useState(children);

  useEffect(() => {
    if (!children.length) return;
    setTree(children);
  }, [children]);

  if (!children.length) return null;

  return (
    <Page>
      <h1>{title}</h1>
      <p>
        <TimeDisplay size={25} time={totalTime({ children })} />
      </p>
      <SortableTree
        isVirtualized={false}
        treeData={data}
        onChange={setTree}
        nodeContentRenderer={(node) => {
          const time = totalTime(node.node);
          if (node.isDragging) {
            return (
              <DropTarget>
                <h1>{node.node.title}</h1>
              </DropTarget>
            );
          }
          return (
            <div style={{ position: "relative" }}>
              <Expandable node={node} />
              <Node required={node.node.required}>
                <Draggable connectDragSource={node.connectDragSource}>
                  <Handle type={node.node.type} required={node.node.required}>
                    <TopicIcon type={node.node.type} />
                  </Handle>
                </Draggable>
                <Details difficulty={node.node.difficulty}>
                  <h1>
                    {!node.node.length && !time && (
                      <Difficulty level={node.node.difficulty} />
                    )}{" "}
                    {node.node.title}
                  </h1>
                  <div>
                    {!(time === 0 || !node.node.children) && (
                      <Difficulty level={node.node.difficulty} />
                    )}
                    <TimeDisplay time={node.node.length || time} />
                  </div>
                </Details>
              </Node>
            </div>
          );
        }}
      />
    </Page>
  );
}

const Page = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@586&display=swap");
  font-family: "Raleway", sans-serif;
  color: #003;

  > h1 {
    margin-bottom: 0;
  }
  > p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0;
  }
`;

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

const DropTarget = styled.div`
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
`;

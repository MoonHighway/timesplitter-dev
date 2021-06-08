import SortableTree from "react-sortable-tree";
import TreeNode from "./TreeNode";
import { DropTarget } from "./DragDrop";
import ErrorBoundary from "../ErrorBoundary";
import styled from "styled-components";
import "react-sortable-tree/style.css";

//
// TODO: Error Boundary and hack fix
//
//  [ ] Add an Error Boundary
//  [ ] Check for Irrevalant error: and refresh page
//

export default function Menu({
  data,
  selectedTitle,
  onChange = (f) => f,
  onSelect = (f) => f,
}) {
  return (
    <Container>
      <ErrorBoundary>
        <SortableTree
          isVirtualized={false}
          treeData={data}
          onChange={onChange}
          generateNodeProps={({ node }) => ({
            selected: selectedTitle === node.title,
            onSelect: (n) => onSelect(n),
          })}
          nodeContentRenderer={(node) => {
            if (node.isDragging) {
              return (
                <DropTarget>
                  <h1>{node.node.title}</h1>
                </DropTarget>
              );
            }
            return <TreeNode node={node} onSelect={onSelect} />;
          }}
        />
      </ErrorBoundary>
    </Container>
  );
}

const Container = styled.div`
  min-width: 450px;
  grid-area: 2 / 1 / 11 / 2;
`;

import SortableTree from "react-sortable-tree";
import TreeNode from "./TreeNode";
import { DropTarget } from "./DragDrop";
import "react-sortable-tree/style.css";

export default function Menu({ data, onChange = (f) => f }) {
  return (
    <SortableTree
      isVirtualized={false}
      treeData={data}
      onChange={onChange}
      nodeContentRenderer={(node) => {
        if (node.isDragging) {
          return (
            <DropTarget>
              <h1>{node.node.title}</h1>
            </DropTarget>
          );
        }
        return <TreeNode node={node} />;
      }}
    />
  );
}

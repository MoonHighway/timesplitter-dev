import { useState } from "react";
import { useTreeContent } from "../hooks";
import AddForm from "./AddForm";
import CourseTitle from "./CourseTitle";
import Menu from "./Menu";
import TopicMeta from "./TopicMeta";
import TopicMarkdown from "./TopicMarkdown";

export default function App() {
  const { title, children, data, setTree } = useTreeContent();
  const [selectedTitle, setSelectedTitle] = useState();
  if (data) {
    return (
      <>
        <AddForm
          onNewTopic={(title, difficulty) =>
            alert(`TODO: Add Net Topic (${title},${difficulty})`)
          }
        />
        <CourseTitle title={title} topics={children} />
        <Menu data={data} onChange={setTree} selectedTitle={selectedTitle} onSelect={setSelectedTitle} />
        <TopicMeta />
        <TopicMarkdown />
      </>
    );
  }
  return null;
}

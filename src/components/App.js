import { useState } from "react";
import { useTreeContent } from "../hooks";
import AddForm from "./AddForm";
import CourseTitle from "./CourseTitle";
import Menu from "./Menu";
import TopicMeta from "./TopicMeta";
import TopicMarkdown from "./TopicMarkdown";

export default function App() {
  const { title, children, data, setTree, addTopic } = useTreeContent();
  const [selectedTitle, setSelectedTitle] = useState();
  if (data) {
    return (
      <>
        <AddForm agenda={children} onNewTopic={addTopic} />
        <CourseTitle title={title} topics={children} />
        <Menu data={data} onChange={setTree} selectedTitle={selectedTitle} onSelect={setSelectedTitle} />
        <TopicMeta />
        <TopicMarkdown />
      </>
    );
  }
  return null;
}

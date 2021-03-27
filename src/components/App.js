import { useTreeContent } from "../hooks";
import AddForm from "./AddForm";
import CourseTitle from "./CourseTitle";
import Menu from "./Menu";
import TopicMeta from "./TopicMeta";
import TopicMarkdown from "./TopicMarkdown";

export default function App() {
  const { title, children, data, setTree } = useTreeContent();
  if (data) {
    return (
      <>
        <AddForm />
        <CourseTitle title={title} topics={children} />
        <Menu data={data} onChange={setTree} />
        <TopicMeta />
        <TopicMarkdown />
      </>
    );
  }

  return null;
}

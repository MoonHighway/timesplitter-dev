import { useTreeContent } from "../hooks";
import AddForm from "./AddForm";
import CourseTitle from "./CourseTitle";
import Menu from "./Menu";
import TopicMeta from "./TopicMeta";
import TopicMarkdown from "./TopicMarkdown";
import { setSelectedBranch } from "../lib";

export default function App() {
  let {
    title,
    children,
    data,
    sortTopics,
    addTopic,
    selectedTitle,
    setSelectedTitle,
  } = useTreeContent();

  const onAddTopic = (title, difficulty) =>
    addTopic(title, difficulty, selectedTitle);

  if (data) {
    if (selectedTitle) data = data.map(setSelectedBranch(selectedTitle));
    return (
      <>
        <AddForm agenda={data.children} onNewTopic={onAddTopic} />
        <CourseTitle title={title} topics={children} />
        <Menu
          data={data}
          onChange={sortTopics}
          selectedTitle={selectedTitle}
          onSelect={setSelectedTitle}
        />
        <TopicMeta />
        <TopicMarkdown />
      </>
    );
  }
  return null;
}

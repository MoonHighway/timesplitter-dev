import { useTreeContent } from "../hooks";
import AddForm from "./AddForm";
import CourseTitle from "./CourseTitle";
import Menu from "./Menu";
import TopicMeta from "./TopicMeta";
import TopicMarkdown from "./TopicMarkdown";
import { setSelectedBranch } from "../lib";
import { colors } from "../theme";
import styled from "styled-components";

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
        <TopicCard>
          <TopicMeta />
          <TopicMarkdown />
        </TopicCard>
      </>
    );
  }
  return null;
}

const TopicCard = styled.section`
  grid-area: 2 / 2 / 11 / 5;
  margin: 0 71px 45px 0;
  border: 4px solid ${colors.darkbland};
  border-radius: 80px;
  box-shadow: 10px 13px 22px 9px ${colors.darkbland};
`;

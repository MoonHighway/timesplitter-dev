import { useTreeContent } from "../hooks";
import AddForm from "./AddForm";
import CourseTitle from "./CourseTitle";
import Menu from "./Menu";
import TopicMeta from "./TopicMeta";
import TopicMarkdown from "./TopicMarkdown";
import { setSelectedBranch } from "../lib";
import { colors, fonts } from "../theme";
import styled from "styled-components";

export default function App() {
  let {
    title,
    children,
    data,
    sortTopics,
    addTopic,
    removeTopic,
    renameTopic,
    updateTopicMeta,
    saveMarkdown,
    selectedNode,
    setSelectedNode,
  } = useTreeContent();

  const onAddTopic = (title, difficulty) =>
    addTopic(title, difficulty, selectedNode && selectedNode.title);

  if (data) {
    if (selectedNode) data = data.map(setSelectedBranch(selectedNode.title));
    return (
      <>
        <AddForm agenda={data.children} onNewTopic={onAddTopic} />
        <CourseTitle title={title} topics={children} />
        <Menu
          data={data}
          onChange={sortTopics}
          selectedTitle={selectedNode && selectedNode.title}
          onSelect={setSelectedNode}
        />

        <TopicCard type={selectedNode && selectedNode.type}>
          {selectedNode ? (
            <>
              <TopicMeta
                content={{ title, agenda: data }}
                node={selectedNode}
                onRemove={removeTopic}
                onRename={(oldName, newName) => {
                  renameTopic(oldName, newName);
                  setSelectedNode({
                    ...selectedNode,
                    title: newName,
                  });
                }}
                onChange={updateTopicMeta}
              />
              <TopicMarkdown
                title={selectedNode.title}
                content={{ title, agenda: data }}
                onChange={saveMarkdown}
              />
            </>
          ) : (
            <p className="empty-message">Select a Topic from the menu</p>
          )}
        </TopicCard>
      </>
    );
  }
  return null;
}

const TopicCard = styled.section`
  grid-area: 2 / 2 / 11 / 5;
  margin: 0;
  border-top: 4px solid ${colors.darkbland};
  border-left: 4px solid ${colors.darkbland};
  border-radius: 80px 0 0 0;
  box-shadow: inset -5px -5px 14px 9px #798d9c;
  background-color: white;

  .empty-message {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: ${fonts.subtitle};
    font-size: 1.5em;
  }
`;

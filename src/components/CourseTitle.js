import { TimeDisplay, totalTime, TopicIcon, Difficulty } from "../lib";
import { colors, fonts } from "../theme";
import { useTopicCounts } from "../hooks";
import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
import ErrorBoundary from "./ErrorBoundary";

const Hide = ({ when = true, children }) => !when && children;

export default function CourseTitle({ title, topics = [] }) {
  const {
    selectedCount,
    setSelectedCount,
    slides,
    samples,
    labs,
    exercises,
    noDifficulty,
    beginner,
    intermediate,
    advanced,
    expert,
  } = useTopicCounts({ title, children: topics });

  return (
    <Container>
      <ErrorBoundary>
        <Row>
          <Column>
            <h1>{title}</h1>
            <TypeRow>
              <TimeDisplay
                fill={colors.meta}
                size={25}
                time={totalTime({ children: topics })}
              />

              <Hide when={selectedCount !== "topics"}>
                <Hide when={!slides}>
                  <TopicIcon type="slides" fill={colors.slides} />
                  <span>{slides} presentations</span>
                </Hide>

                <Hide when={!samples}>
                  <TopicIcon type="sample" stroke={colors.sample} />
                  <span>{samples} samples</span>
                </Hide>

                <Hide when={!labs}>
                  <TopicIcon type="lab" fill={colors.lab} />
                  <span>{labs} lab steps</span>
                </Hide>

                <Hide when={!exercises}>
                  <TopicIcon type="exercise" fill={colors.exercise} />
                  <span>{exercises} exercise steps</span>
                </Hide>
              </Hide>

              <Hide when={selectedCount !== "time"}>
                <Hide when={!slides}>
                  <TopicIcon type="slides" fill={colors.slides} />
                  <span>{slides} mins</span>
                </Hide>

                <Hide when={!samples}>
                  <TopicIcon type="sample" stroke={colors.sample} />
                  <span>{samples} mins</span>
                </Hide>

                <Hide when={!labs}>
                  <TopicIcon type="lab" fill={colors.lab} />
                  <span>{labs} mins</span>
                </Hide>

                <Hide when={!exercises}>
                  <TopicIcon type="exercise" fill={colors.exercise} />
                  <span>{exercises} mins</span>
                </Hide>
              </Hide>

              <Hide when={selectedCount !== "difficulty"}>
                <Hide when={!beginner}>
                  <Difficulty level="beginner" size={20} />
                  <span>{beginner} topics</span>
                </Hide>

                <Hide when={!intermediate}>
                  <Difficulty level="intermediate" size={20} />
                  <span>{intermediate} topics</span>
                </Hide>

                <Hide when={!advanced}>
                  <AdvancedContainer>
                    <Difficulty level="advanced" size={20} />
                  </AdvancedContainer>
                  <span>{advanced} topics</span>
                </Hide>

                <Hide when={!expert}>
                  <ExpertContainer>
                    <Difficulty level="expert" size={20} />
                  </ExpertContainer>
                  <span>{expert} expert topics</span>
                </Hide>
              </Hide>
            </TypeRow>
          </Column>
          <PieChart
            className="chart"
            startAngle={200}
            lineWidth={60}
            animate={true}
            data={[
              { title: "Samples", value: samples, color: colors.sample },
              { title: "Lab Steps", value: labs, color: colors.lab },
              {
                title: "Exercise Steps",
                value: exercises,
                color: colors.exercise,
              },
              {
                title: "Slide Presentations",
                value: slides,
                color: colors.slides,
              },
            ]}
          />
          <InfoChoice>
            <p
              className={selectedCount === "topics" ? "selected" : ""}
              onClick={() => setSelectedCount("topics")}
            >
              topics
            </p>
            <p
              className={selectedCount === "time" ? "selected" : ""}
              onClick={() => setSelectedCount("time")}
            >
              time
            </p>
            <p
              className={selectedCount === "difficulty" ? "selected" : ""}
              onClick={() => setSelectedCount("difficulty")}
            >
              difficulty
            </p>
            <p>required</p>
            <p>%</p>
          </InfoChoice>
        </Row>
      </ErrorBoundary>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  grid-area: 1 / 2 / 2 / 5;
  color: white;
  display: flex;
  justify-content: center;
  font-family: ${fonts.text};
  h1 {
    font-family: ${fonts.title};
    font-size: 5em;
    margin: 0 0.25em;
  }
  .chart {
    width: 100px;
  }
  span {
    flex-grow: 1;
  }
`;

const InfoChoice = styled.div`
  margin-left: 30px;

  p {
    cursor: pointer;
  }

  p.selected {
    position: relative;
    color: ${colors.highlight};
    &:before {
      content: "< ";
      position: absolute;
      left: -15px;
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TypeRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 22px;
  span {
    margin-left: 10px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const AdvancedContainer = styled.div`
  padding: 2px;
  border-radius: 4px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
`;

const ExpertContainer = styled.div`
  padding: 2px;
  border-radius: 4px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;

  > div:first-child {
    position: relative;
    top: 2px;
    left: 2px;
  }
`;

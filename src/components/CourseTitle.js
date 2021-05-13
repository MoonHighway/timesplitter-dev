import { TimeDisplay, totalTime, TopicIcon } from "../lib";
import { colors, fonts } from "../theme";
import { useTopicCounts } from "../hooks";
import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";

const Hide = ({ when = true, children }) => !when && children;

export default function CourseTitle({ title, topics = [] }) {
  const { selectedCount, setSelectedCount, slides, samples, labs, exercises } =
    useTopicCounts({ title, children: topics });
  return (
    <Container>
      <Row>
        <Column>
          <h1>{title}</h1>
          <TypeRow>
            <TimeDisplay
              fill={colors.meta}
              size={25}
              time={totalTime({ children: topics })}
            />

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
          <p>difficulty</p>
          <p>required</p>
          <p>%</p>
        </InfoChoice>
      </Row>
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

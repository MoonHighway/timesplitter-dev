import { TimeDisplay, totalTime, TopicIcon } from "../lib";
import { colors, fonts } from "../theme";
import { useTopicTypeCount } from "../hooks";
import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";

export default function CourseTitle({ title, topics = [] }) {
  const { slides, samples, labSteps, exerciseSteps } = useTopicTypeCount();

  return (
    <Container>
      <Row>
        <PieChart
          className="chart"
          startAngle={200}
          lineWidth={60}
          animate={true}
          data={[
            { title: "Samples", value: samples, color: colors.sample },
            { title: "Lab Steps", value: labSteps, color: colors.lab },
            {
              title: "Exercise Steps",
              value: exerciseSteps,
              color: colors.exercise,
            },
            {
              title: "Slide Presentations",
              value: slides,
              color: colors.slides,
            },
          ]}
        />
        <Column>
          <h1>{title}</h1>
          <TypeRow>
            <TimeDisplay size={25} time={totalTime({ children: topics })} />
            <TopicIcon type="slides" />
            <span>{slides} presentations</span>
            <TopicIcon type="samples" />
            <span>{samples} samples</span>
            <TopicIcon type="lab" />
            <span>{labSteps} lab steps</span>
            <TopicIcon type="exercise" />
            <span>{exerciseSteps} exercise steps</span>
          </TypeRow>
        </Column>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  grid-area: 1 / 2 / 2 / 5;

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
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

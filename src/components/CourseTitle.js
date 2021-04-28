import { useMemo } from "react";
import { TimeDisplay, totalTime } from "../lib";
import { colors } from "../theme";
import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";

const useTopicTypeCount = (topics = []) =>
  useMemo(() => {
    // if (!topics || !topics.length) return;
    return {
      slides: 2,
      samples: 15,
      labSteps: 10,
      exerciseSteps: 7,
    };
  }, [topics]);

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
          <Row>
            <p>
              <TimeDisplay size={25} time={totalTime({ children: topics })} />
            </p>
            <p>{slides} presentations</p>
            <p>{samples} samples</p>
            <p>{labSteps} lab steps</p>
            <p>{exerciseSteps} exercise steps</p>
          </Row>
        </Column>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  grid-area: 1 / 2 / 2 / 5;

  svg {
    width: 75px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

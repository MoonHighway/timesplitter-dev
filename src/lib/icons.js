import { MdTimer } from "react-icons/md";
import { RiSlideshowFill } from "react-icons/ri";
import { GrWorkshop } from "react-icons/gr";
import { GoInfo } from "react-icons/go";
import { ImLab } from "react-icons/im";
import { BsDiamondFill } from "react-icons/bs";
import { FaCode, FaUserGraduate, FaSquare, FaCircle } from "react-icons/fa";
import styled from "styled-components";

export const TopicIcon = ({ type, ...props }) =>
  type === "sample" ? (
    <Sample {...props} />
  ) : type === "lab" ? (
    <Lab {...props} />
  ) : type === "course-lab" ? (
    <CourseLab {...props} />
  ) : type === "exercise" ? (
    <Exercise />
  ) : type === "slides" || type === "section" ? (
    <Slides />
  ) : type === "meta" ? (
    <Info />
  ) : (
    <Code>{"{ }"}</Code>
  );

export const Difficulty = ({ level, size = 12 }) =>
  level === "intermediate" ? (
    <BlueSquare size={size} />
  ) : level === "advanced" ? (
    <BlackDiamond size={size} />
  ) : level === "expert" ? (
    <DoubleDiamond size={size} />
  ) : level === "beginner" ? (
    <GreenCircle size={size} />
  ) : null;

const Code = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 1.2em;
`;

export const Info = ({ color = "#898989", size = 25, ...props }) => (
  <GoInfo size={size} color={color} {...props} />
);

export const Timer = ({ color = "#898989", size = 25, ...props }) => (
  <MdTimer size={size} color={color} {...props} />
);

export const Slides = ({ color = "#898989", size = 25, ...props }) => (
  <RiSlideshowFill size={size} color={color} {...props} />
);

export const Sample = ({ color = "#898989", size = 25, ...props }) => (
  <GrWorkshop size={size} color={color} {...props} />
);

export const Lab = ({ color = "#898989", size = 25, ...props }) => (
  <ImLab size={size} color={color} {...props} />
);

export const Exercise = ({ color = "#898989", size = 25, ...props }) => (
  <FaCode size={size} color={color} {...props} />
);

export const CourseLab = ({ color = "#898989", size = 25, ...props }) => (
  <FaUserGraduate size={size} color={color} {...props} />
);

export const GreenCircle = ({ size = 25, ...props }) => (
  <FaCircle color="limegreen" size={size} {...props} />
);

export const BlueSquare = ({ size = 25, ...props }) => (
  <FaSquare color="#6c6cfd" size={size} {...props} />
);

export const BlackDiamond = ({ size = 25, ...props }) => (
  <BsDiamondFill color="black" size={size} {...props} />
);

export const DoubleDiamond = ({ size = 25, ...props }) => (
  <Double {...props}>
    <BsDiamondFill color="black" size={size} />
    <BsDiamondFill color="black" size={size} />
  </Double>
);

const Double = styled.div`
  float: left;
  svg:last-of-type {
    position: relative;
    left: -5px;
  }
`;
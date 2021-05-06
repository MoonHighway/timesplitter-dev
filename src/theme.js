import { createGlobalStyle } from "styled-components";

export const fonts = {
  title: "Yanone Kaffeesatz",
  subtitle: "Exo",
  text: "Pontano Sans",
  handwriting: "CoveredByYourGrace",
};

export const colors = {
  primary: "#2B558C",
  primaryLight: "#3370A6",
  secondary: "#8BBBD9",
  contrast: "#BF8641",
  contrastLight: "#F2C777",
  dark: "#323A40",
  light: "#B5D2E8",
  bland: "#97AFC2",
  darkbland: "#798D9C",
  darkhard: "#313236",
  highlight: "#4DFFA7",
  notRequired: "#ABABAB",
  meta: "lightblue",
  sample: "#e6e1ad",
  lab: "#ade6bb",
  exercise: "#daade6",
  slides: "#f53b3b",
  noTopic: "#adb2e5",
  beginner: "#32CD32",
  intermediate: "#6c6cfd",
  required: "#d25d5d",
};

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: ${colors.darkhard};
  }
  h1, h2, h3, h4, h5, p, td, th {
    margin: 0;
    padding: 0;
  }
  #root {  
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    overflow: clip;
  }
`;

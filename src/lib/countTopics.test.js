import {
  countByType,
  countByTime,
  countByDifficulty,
  countByRequired,
  countByPercent,
  countRequiredByDifficulty,
  countPercentByDifficulty,
} from ".";
const testData = require("./countTopics.test.json");

it("countByType(topic)", () => {
  let result = countByType(testData);
  expect(result).toEqual({
    slides: 0,
    samples: 0,
    labs: 0,
    exercises: 0,
  });
});

it("countByTime(topic)", () => {
  let result = countByTime(testData);
  expect(result).toEqual({
    slides: 0,
    samples: 0,
    labs: 0,
    exercises: 0,
  });
});

it("countByRequired(topic)", () => {
  let result = countByRequired(testData);
  expect(result).toEqual({
    slides: 0,
    samples: 0,
    labs: 0,
    exercises: 0,
  });
});

it("countByPercent(topic)", () => {
  let result = countByPercent(testData);
  expect(result).toEqual({
    slides: 0,
    samples: 0,
    labs: 0,
    exercises: 0,
  });
});

it("countByDifficulty(topic)", () => {
  let result = countByDifficulty(testData);
  expect(result).toEqual({
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    expert: 0,
  });
});

it("countRequiredByDifficulty(topic)", () => {
  let result = countRequiredByDifficulty(testData);
  expect(result).toEqual({
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    expert: 0,
  });
});

it("countPercentByDifficulty(topic)", () => {
  let result = countPercentByDifficulty(testData);
  expect(result).toEqual({
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    expert: 0,
  });
});

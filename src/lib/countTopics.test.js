import {
  countByType,
  countByTime,
  countByDifficulty,
  //countByRequired,
} from ".";
const testData = require("./countTopics.test.json");

// it("countByType(topic)", () => {
//   let result = countByType(testData);
//   expect(result).toEqual({
//     slides: 2,
//     samples: 3,
//     labs: 4,
//     exercises: 5,
//   });
// });

it("countByTime(topic)", () => {
  let result = countByTime(testData);
  expect(result).toEqual({
    slides: 10,
    samples: 40,
    labs: 12,
    exercises: 30,
  });
});

it("countByDifficulty(topic)", () => {
  let result = countByDifficulty(testData);
  expect(result).toEqual({
    beginner: 6,
    intermediate: 3,
    advanced: 5,
    expert: 5,
  });
});

// it("countByRequired(topic)", () => {
//   let result = countByRequired(testData);
//   expect(result).toEqual({
//     slides: 0,
//     samples: 0,
//     labs: 0,
//     exercises: 0,
//   });
// });

const fs = require("fs");
fs.readFile("./input.txt", "utf8", (err, data) => {
  solve(data);
});

const solve = (data) => {
  const input = to2DArray(data);
  console.log(part1(input)+"\n",part2(input));
  fs.writeFileSync("./output.txt", part1(input) + "\n" +  part2(input));
};

// Part 1
const part1 = (input) => {
  const visiblePositions = [];
  setVisibleEdgePositions(input, visiblePositions);
  setVisibleInteriorPositions(input, visiblePositions);
  return "Part 1: " + visiblePositions.length;
};

const setVisibleEdgePositions = (input, visiblePositions) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const isEdgePosition =
        i === 0 ||
        j === 0 ||
        i === input.length - 1 ||
        j === input[i].length - 1;
      if (isEdgePosition) {
        visiblePositions.push([i, j]);
      }
    }
  }
};

const setVisibleInteriorPositions = (input, visiblePositions) => {
  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      const currentValue = input[i][j];
      const { topValues, bottomValues, leftValues, rightValues } =
        getDirectionValues(input, i, j);
      const isVisible =
        currentValue > Math.max(...topValues) ||
        currentValue > Math.max(...bottomValues) ||
        currentValue > Math.max(...leftValues) ||
        currentValue > Math.max(...rightValues);
      if (isVisible) {
        visiblePositions.push([i, j]);
      }
    }
  }
};

// Part 2
const part2 = (input) => {
  const visiblePositions = [];
  let maxScenicPoint = 0;
  setVisibleInteriorPositions(input, visiblePositions);
  visiblePositions.forEach(([i, j]) => {
    const scenicPoint = getScenicPoint(input, i, j);
    maxScenicPoint = Math.max(scenicPoint, maxScenicPoint);
  });
  return "Part 2: " + maxScenicPoint;
};

const getScenicPoint = (input, i, j) => {
  const currentValue = input[i][j];
  const { topValues, bottomValues, leftValues, rightValues } =
    getDirectionValues(input, i, j);
  let scenicPoint = 1;
  const values = [
    topValues.reverse(),
    bottomValues,
    leftValues.reverse(),
    rightValues,
  ];
  values.forEach((val) => {
    let step = 0;
    val.every((v) => {
      step++;
      if (v < currentValue) {
        return true;
      }
      return false;
    });
    scenicPoint *= step;
  });
  return scenicPoint;
};

// Utils
const to2DArray = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const getDirectionValues = (input, i, j) => {
  const topValues = input
    .map((row, index) => {
      if (index < i) {
        return row[j];
      }
    })
    .filter((val) => val !== undefined);
  const bottomValues = input
    .map((row, index) => {
      if (index > i) {
        return row[j];
      }
    })
    .filter((val) => val !== undefined);
  const leftValues = input[i].filter((val, index) => index < j);
  const rightValues = input[i].filter((val, index) => index > j);
  return { topValues, bottomValues, leftValues, rightValues };
};

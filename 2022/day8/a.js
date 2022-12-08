const fs = require("fs");
fs.readFile("./input.txt", "utf8", (err, data) => {
  solve(data);
});

const solve = (data) => {
  const input = to2DArray(data);
  const visiblePositions = [];
  setVisibleRearPositions(input, visiblePositions);
  setVisibleInteriorPositions(input, visiblePositions);
  console.log(visiblePositions.length);
};

const to2DArray = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const setVisibleRearPositions = (input, visiblePos) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const isRearPosition =
        i === 0 ||
        j === 0 ||
        i === input.length - 1 ||
        j === input[i].length - 1;
      if (isRearPosition) {
        visiblePos.push([i, j]);
      }
    }
  }
};

const setVisibleInteriorPositions = (input, visiblePos) => {
  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      const currentValue = input[i][j];
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
      const isVisible =
        currentValue > Math.max(...topValues) ||
        currentValue > Math.max(...bottomValues) ||
        currentValue > Math.max(...leftValues) ||
        currentValue > Math.max(...rightValues);
      if (isVisible) {
        visiblePos.push([i, j]);
      }
    }
  }
};

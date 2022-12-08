const fs = require("fs");
fs.readFile("./input.txt", "utf8", (err, data) => {
  solve(data);
});

const solve = (data) => {
  const input = to2DArray(data);
  const visiblePositions = [];

  //   Remove comment below to see the result of part 1
  //   setVisibleRearPositions(input, visiblePositions);
  setVisibleInteriorPositions(input, visiblePositions);
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
  // Part 2 variable. This is the highest point possible from a visible position
  let maxScenicPoint = 0;
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
        // Part 2
        let topStep = 0,
          bottomStep = 0,
          leftStep = 0,
          rightStep = 0;
        // Reverse top and left to start from current position to the top and left rear.
        topValues.reverse().every((val) => {
            topStep++
            if(val < currentValue) {
                return true;
            }
            return false;
        });
        bottomValues.every((val) => {
            bottomStep++
            if(val < currentValue) {
                return true;
            }
            return false;
        });
        leftValues.reverse().every((val) => {
            leftStep++
            if(val < currentValue) {
                return true;
            }
            return false;
        });
        rightValues.every((val) => {
            rightStep++
            if(val < currentValue) {
                return true;
            }
            return false;
        });
        const scenicPoint = topStep * bottomStep * leftStep * rightStep;
        maxScenicPoint = Math.max(scenicPoint, maxScenicPoint);
      }
    }
  }
  console.log(maxScenicPoint);
};

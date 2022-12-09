import { readFileSync, writeFileSync } from "fs";

const part1 = (data: string[]): number => {
  let headPosition = [0, 0];
  let tailPosition = [0, 0];
  let visitedPositions: number[][] = [tailPosition];
  const updateTailPosition = (previousHeadPosition: number[]) => {
    if (
      Math.abs(headPosition[0] - tailPosition[0]) <= 1 &&
      Math.abs(headPosition[1] - tailPosition[1]) <= 1
    ) {
      return;
    }
    if (headPosition[0] === tailPosition[0]) {
      if (headPosition[1] - tailPosition[1] > 1) {
        tailPosition = [tailPosition[0], tailPosition[1] + 1];
      } else if (headPosition[1] - tailPosition[1] < -1) {
        tailPosition = [tailPosition[0], tailPosition[1] - 1];
      }
    } else if (
      Math.abs(headPosition[0] - tailPosition[0]) >= 2 ||
      Math.abs(headPosition[1] - tailPosition[1]) >= 2
    ) {
      tailPosition = previousHeadPosition;
    }
    visitedPositions.push(tailPosition);
  };
  data.forEach((line) => {
    const [direction, step] = line.split(" ");
    for (let i = 0; i < parseInt(step, 10); i++) {
      const previousHeadPosition = headPosition;
      switch (direction) {
        case "U":
          headPosition = [headPosition[0] - 1, headPosition[1]];

          break;
        case "D":
          headPosition = [headPosition[0] + 1, headPosition[1]];

          break;
        case "R":
          headPosition = [headPosition[0], headPosition[1]  + 1];

          break;
        case "L":
          headPosition = [headPosition[0] , headPosition[1] - 1];
          break;
      }
      updateTailPosition(previousHeadPosition);
    }
  });
  const result = [...new Set(visitedPositions.map(p => p.join(",")))]
  return result.length;
};

const solve = (input: string) => {
  const data = input.split("\n");
  const p1Point = part1(data);
  console.log(`Part 1: ${p1Point}`);
  writeFileSync("./output.txt", `Part 1: ${p1Point}`);
};

const exampleInput = readFileSync("./exampleInput.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
solve(input);

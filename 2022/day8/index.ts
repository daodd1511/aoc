import { readFileSync, writeFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8");
const solve = (input: string) => {
  const data = to2DArray(input);
  console.log(part1(data));
  console.log(part2(data));
  writeFileSync("./output.txt", part1(data) + "\n" + part2(data));
};

// Part 1
const part1 = (data: number[][]): string => {
  const visiblePositions: number[][] = [];
  setVisibleEdgePositions(data, visiblePositions);
  setVisibleInteriorPositions(data, visiblePositions);
  return "Part 1: " + visiblePositions.length;
};

const setVisibleEdgePositions = (
  data: number[][],
  visiblePositions: number[][]
) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const isEdgePosition =
        i === 0 || j === 0 || i === data.length - 1 || j === data[i].length - 1;
      if (isEdgePosition) {
        visiblePositions.push([i, j]);
      }
    }
  }
};

const setVisibleInteriorPositions = (
  data: number[][],
  visiblePositions: number[][]
) => {
  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data[i].length - 1; j++) {
      const currentValue = data[i][j];
      const { topValues, bottomValues, leftValues, rightValues } =
        getDirectionValues(data, i, j);
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
const part2 = (data: number[][]) => {
  const visiblePositions: number[][] = [];
  let maxScenicPoint = 0;
  setVisibleInteriorPositions(data, visiblePositions);
  visiblePositions.forEach(([i, j]) => {
    const scenicPoint = getScenicPoint(data, i, j);
    maxScenicPoint = Math.max(scenicPoint, maxScenicPoint);
  });
  return "Part 2: " + maxScenicPoint;
};

const getScenicPoint = (data: number[][], i: number, j: number) => {
  const currentValue = data[i][j];
  const { topValues, bottomValues, leftValues, rightValues } =
    getDirectionValues(data, i, j);
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
const to2DArray = (input: string): number[][] => {
  return input
    .split("\n")
    .map((row) => row.split("").map((val) => parseInt(val, 10)));
};

const getDirectionValues = (data: number[][], i: number, j: number) => {
  const topValues = data
    .map((row, index) => {
      if (index < i) {
        return row[j];
      }
    })
    .filter((val) => val !== undefined) as number[];
  const bottomValues = data
    .map((row, index) => {
      if (index > i) {
        return row[j];
      }
    })
    .filter((val) => val !== undefined) as number[];
  const leftValues = data[i].filter((val, index) => index < j);
  const rightValues = data[i].filter((val, index) => index > j);
  return { topValues, bottomValues, leftValues, rightValues };
};

solve(input);

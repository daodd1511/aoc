import { readFileSync, writeFileSync } from "fs";

const checkPairs = (data: string[]) => {
  const grouped = data.map((i) => i.split(","));
  let containPairs = 0;
  let overlapPairs = 0;
  grouped.forEach((group) => {
    const firstElf = group[0];
    const secondElf = group[1];
    const firstElfFirstShift = parseInt(firstElf.split("-")[0], 10);
    const firstElfSecondShift = parseInt(firstElf.split("-")[1], 10);
    const secondElfFirstShift = parseInt(secondElf.split("-")[0], 10);
    const secondElfSecondShift = parseInt(secondElf.split("-")[1], 10);
    const isFirstElfContain =
      firstElfFirstShift <= secondElfFirstShift &&
      firstElfSecondShift >= secondElfSecondShift;
    const isSecondElfContain =
      secondElfFirstShift <= firstElfFirstShift &&
      secondElfSecondShift >= firstElfSecondShift;
    const isOverlap =
      firstElfFirstShift <= secondElfSecondShift &&
      firstElfSecondShift >= secondElfFirstShift;
    if (isFirstElfContain || isSecondElfContain) {
      containPairs++;
    } 
    if (isOverlap) {
      overlapPairs++;
    }
  });
  return { containPairs, overlapPairs };
};

const solve = (input: string) => {
    const data = input.split("\n");
    const { containPairs, overlapPairs } = checkPairs(data);
    console.log("Part 1: " + containPairs);
    console.log("Part 2: " + overlapPairs);
  writeFileSync("./output.txt", 'Part 1: ' + containPairs + '\n' + 'Part 2: ' + overlapPairs);
};

// const exampleInput = readFileSync("./exampleInput.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
solve(input);

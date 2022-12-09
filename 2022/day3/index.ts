import { readFileSync, writeFileSync } from "fs";

const part1 = (data: string[]): number => {
  let point = 0;
  data.forEach((line) => {
    const firstHalf = line.slice(0, line.length / 2);
    const secondHalf = line.slice(line.length / 2);
    const firstHalfSet = [...new Set(firstHalf)];
    const secondHalfSet = [...new Set(secondHalf)];
    firstHalfSet.forEach((char) => {
      if (secondHalfSet.indexOf(char) !== -1) {
        if (char === char.toLowerCase()) {
          point += char.charCodeAt(0) - 96;
        } else {
          point += char.charCodeAt(0) - 38;
        }
      }
    });
  });
  return point;
};

const part2 = (data: string[]): number => {
  let grouped = [];
  let point = 0;
  for (let i = 0; i < data.length; i += 3) {
    grouped.push([data[i], data[i + 1], data[i + 2]]);
  }

  grouped.forEach((group) => {
    const first = [...new Set(group[0])];
    const second = [...new Set(group[1])];
    const third = [...new Set(group[2])];
    first.forEach((char) => {
      if (second.indexOf(char) !== -1 && third.indexOf(char) !== -1) {
        if (char === char.toLowerCase()) {
          point += char.charCodeAt(0) - 96;
        } else {
          point += char.charCodeAt(0) - 38;
        }
      }
    });
  });
  return point;
};

const solve = (input: string) => {
  const data = input.split("\n");
  const part1Result = part1(data);
  const part2Result = part2(data);
  console.log("Part 1: " + part1Result);
  console.log("Part 2: " + part2Result);
  writeFileSync(
    "./output.txt",
    "Part 1: " + part1Result + "\n" + "Part 2: " + part2Result
  );
};

// const exampleInput = readFileSync("./exampleInput.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
solve(input);

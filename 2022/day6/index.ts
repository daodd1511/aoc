import { readFileSync, writeFileSync } from "fs";

const haveDuplicate = (arr: string[]) => {
  return arr.some((item, index) => arr.indexOf(item) !== index);
};

const getFirstMarker = (input: string[], numberOfCharacter: number): number => {
  let ans = 0;
  for (let i = numberOfCharacter; i < input.length; i++) {
    const arr = input.slice(i - numberOfCharacter, i);
    if (!haveDuplicate(arr)) {
      ans = i;
      break;
    }
  }
  return ans;
};

const solve = (input: string) => {
  const data = input.split("");
  const part1 = getFirstMarker(data, 4);
  const part2 = getFirstMarker(data, 14);
  console.log("Part 1: " + part1);
  console.log("Part 2: " + part2);
  writeFileSync("./output.txt", "Part 1: " + part1 + "\n" + "Part 2: " + part2);
};

const exampleInput = readFileSync("./exampleInput.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
solve(input);

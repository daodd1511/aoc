import { readFileSync, writeFileSync } from "fs";
import { part1 } from "./part1";
import { part2 } from "./part2";

const solve = (input: string) => {
  const data = input.split("\n");
  const part1Result = part1(data);
  const part2Result = part2(data);
  console.log("Part 1: " + part1Result);
  console.log("Part 2: " + part2Result);
  writeFileSync("./output.txt", 'Part 1: ' + part1Result + '\n' + 'Part 2: ' + part2Result);
};

const exampleInput = readFileSync("./exampleInput.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
solve(input);

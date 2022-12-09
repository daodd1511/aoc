import { readFileSync, writeFileSync } from "fs";
import { part1 } from "./part1";
import { part2 } from "./part2";

const solve = (input: string) => {
  const data = input.split("\n");
  const p1Point = part1(data);
  const p2Point = part2(data);
  console.log(`Part 1: ${p1Point}`);
  console.log(`Part 2: ${p2Point}`);
  writeFileSync("./output.txt", `Part 1: ${p1Point}` + "\n" + `Part 2: ${p2Point}`);
};

const exampleInput = readFileSync("./exampleInput.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
solve(exampleInput);

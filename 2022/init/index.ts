import { readFileSync, writeFileSync } from "fs";

const exampleInput = readFileSync("./exampleInput.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
const solve = (input: string) => {
  writeFileSync("./output.txt", input);
};

solve(exampleInput);

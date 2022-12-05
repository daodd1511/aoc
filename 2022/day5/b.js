const fs = require("fs");
fs.readFile("./input.txt", "utf8", (err, data) => {
  const exampleStack = [["Z", "N"], ["M", "C", "D"], ["P"]];
  const stack = [
    ["H", "T", "Z", "D"],
    ["Q", "R", "W", "T", "G", "C", "S"],
    ["P", "B", "F", "Q", "N", "R", "C", "H"],
    ["L", "C", "N", "F", "H", "Z"],
    ["G", "L", "F", "Q", "S"],
    ["V", "P", "W", "Z", "B", "R", "C", "S"],
    ["Z", "F", "J"],
    ["D", "L", "V", "Z", "R", "H", "Q"],
    ["B", "H", "G", "N", "F", "Z", "L", "D"],
  ];
  const input = data.split("\n");
  input.forEach((line) => {
    const splitedLine = line.split(" ");
    const numberOfMove = parseInt(splitedLine[1], 10);
    const fromStack = splitedLine[3];
    const toStack = splitedLine[5];
    for (let i = 0; i < numberOfMove; i++) {
      const disk = stack[fromStack - 1].pop();
      stack[toStack - 1].push(disk);
    }
  });
  const result = stack.reduce((acc, cur) => {
    return acc + cur[cur.length - 1];
  }, "");
  console.log(result);
});

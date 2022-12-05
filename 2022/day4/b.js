const fs = require("fs");
fs.readFile("./input.txt", "utf8", (err, data) => {
  const input = data.split("\n");
  const grouped = input.map((i) => i.split(","));
  let overlapPairs = 0;
  grouped.forEach((group) => {
    firstElf = group[0];
    secondElf = group[1];
    const firstElfFirstShift = parseInt(firstElf.split("-")[0], 10);
    const firstElfSecondShift = parseInt(firstElf.split("-")[1], 10);
    const secondElfFirstShift = parseInt(secondElf.split("-")[0], 10);
    const secondElfSecondShift = parseInt(secondElf.split("-")[1], 10);
    const isFirstElfContain =
      (firstElfFirstShift <= secondElfFirstShift) &&
      firstElfSecondShift >= secondElfSecondShift;
    const isSecondElfContain =
      secondElfFirstShift <= firstElfFirstShift &&
      secondElfSecondShift >= firstElfSecondShift;
    const isOverlap = firstElfFirstShift <= secondElfSecondShift && firstElfSecondShift >= secondElfFirstShift;
    if (isFirstElfContain || isSecondElfContain || isOverlap) {
      overlapPairs++;
    }
  });
  console.log(overlapPairs);
});

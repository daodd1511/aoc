const fs = require("fs");
fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.split("\n");
  let point = 0;
  input.forEach(line => {
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
    console.log(point);
});

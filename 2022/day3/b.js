const fs = require("fs");
fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.split("\n");
  let grouped = [];
  let point = 0;
  for (let i = 0; i < input.length; i += 3) {
    grouped.push([input[i], input[i + 1], input[i + 2]]);
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
  console.log(point);
});

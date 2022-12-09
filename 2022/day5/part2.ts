const EXAMPLE_STACK = [["Z", "N"], ["M", "C", "D"], ["P"]];
const STACK = [
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
export const part2 = (data: string[]) => {
  data.forEach((line) => {
    const splitedLine = line.split(" ");
    const numberOfMove = parseInt(splitedLine[1], 10);
    const fromStack = parseInt(splitedLine[3], 10);
    const toStack = parseInt(splitedLine[5], 10);
    const tempStack = [];
    for (let i = 0; i < numberOfMove; i++) {
      if (numberOfMove === 1) {
        const disk = STACK[fromStack - 1].pop();
        STACK[toStack - 1].push(disk as string);
      } else {
        const disk = STACK[fromStack - 1].pop();
        tempStack.push(disk);
      }
    }
    if (numberOfMove > 1) {
      for (let i = 0; i < numberOfMove; i++) {
        const disk = tempStack.pop();
        STACK[toStack - 1].push(disk as string);
      }
    }
  });
  const result = STACK.reduce((acc, cur) => {
    return acc + cur[cur.length - 1];
  }, "");
  return result;
};

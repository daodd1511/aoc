interface StringIndexes<Value> {
  [key: string]: Value;
}

const RESPONSE_POINT: StringIndexes<number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const LOST_AGAINST: StringIndexes<string> = {
  X: "B",
  Y: "C",
  Z: "A",
};

const WIN_AGAINST: StringIndexes<string> = {
  X: "C",
  Y: "A",
  Z: "B",
};

const DRAW_AGAINST: StringIndexes<string> = {
  X: "A",
  Y: "B",
  Z: "C",
};

const POINT: StringIndexes<number> = {
  win: 6,
  draw: 3,
  loss: 0,
};

export const part1 = (data: string[]): number => {
  let point = 0;
  data.forEach((line) => {
    const [opponent, response] = line.split(" ");
    // Part 1
    if (opponent === DRAW_AGAINST[response]) {
      point += POINT.draw + RESPONSE_POINT[response];
      return;
    }
    if (opponent === WIN_AGAINST[response]) {
      point += POINT.win + RESPONSE_POINT[response];
      return;
    }
    if (opponent === LOST_AGAINST[response]) {
      point += POINT.loss + RESPONSE_POINT[response];
      return;
    }
  });
  return point;
};

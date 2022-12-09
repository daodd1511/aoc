interface StringIndexes<Value> {
  [key: string]: Value;
}

const RESPONSE_POINT: StringIndexes<number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const LOST_AGAINST: StringIndexes<string> = {
  A: "Z",
  B: "X",
  C: "Y",
};

const WIN_AGAINST: StringIndexes<string> = {
  A: "Y",
  B: "Z",
  C: "X",
};

const DRAW_AGAINST: StringIndexes<string> = {
  A: "X",
  B: "Y",
  C: "Z",
};

const POINT: StringIndexes<number> = {
  win: 6,
  draw: 3,
  loss: 0,
};

const INTEND: StringIndexes<string> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

export const part2 = (data: string[]): number => {
    let point = 0;
    data.forEach((line) => {
        const [opponent, intend] = line.split(" ");
      if (INTEND[intend] === 'draw') {
          const choice = DRAW_AGAINST[opponent];
          point += POINT.draw + RESPONSE_POINT[choice];
      }
      if (INTEND[intend] === 'win') {
          const choice = WIN_AGAINST[opponent];
          point += POINT.win + RESPONSE_POINT[choice];
      }
      if (INTEND[intend] === 'lose') {
          const choice = LOST_AGAINST[opponent];
          point += POINT.loss + RESPONSE_POINT[choice];
      }
    })
    return point;
}

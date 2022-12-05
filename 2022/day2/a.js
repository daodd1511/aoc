const fs = require('fs');

const response = {
    'X': 1,
    'Y': 2,
    'Z': 3,
}

const LOST_AGAINST = {
    'X': 'B',
    'Y': 'C',
    'Z': 'A',
}

const WIN_AGAINST = {
    'X': 'C',
    'Y': 'A',
    'Z': 'B',
}

const DRAW_AGAINST = {
    'X': 'A',
    'Y': 'B',
    'Z': 'C',
}


const POINT = {
    'win': 6,
    'draw': 3,
    'loss': 0,
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.split('\n');
  const grouped = input.map((line) => line.split(' '));
  console.log(grouped);
  let point = 0;
  grouped.forEach((group) => {
    if (group[0] === DRAW_AGAINST[group[1]]) {
      point += POINT.draw + response[group[1]];
        return;
    }
    if (group[0] === WIN_AGAINST[group[1]]) {
        point += POINT.win + response[group[1]];
            return;
    }
    if (group[0] === LOST_AGAINST[group[1]]) {
        point += POINT.loss + response[group[1]];
        return;
    }
  })
  console.log(point);
});